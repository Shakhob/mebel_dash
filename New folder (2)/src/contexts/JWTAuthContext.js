import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Loading from "../components/Loading";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // const decodedToken = jwtDecode(accessToken);
  // const currentTime = Date.now() / 1000;
  return true;
  // return decodedToken.iat > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      const { isAuthenticated } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
      };

    case "LOGIN": {
      // const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        // user,
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AutContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (login, password) => {
    const response = await axios({
      method: "get",
      url: `https://mebeluz.tmweb.ru/dashboard/login.php`,
      params: {
        login,
        password,
      },
      // headers: {
      //   token: accessToken,
      //   lang: "uz",
      // },
    });

    const accessToken = response.data.data;
    const decodeToken = jwtDecode(accessToken);
    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user: decodeToken.user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          // const response = await axios.get(
          //   "http://localhost:8000/dashboard/profile",
          //   { headers: { accessToken } },
          // );
          // const { user } = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              // user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialized) {
    return <Loading />;
  }

  return (
    <AutContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AutContext.Provider>
  );
};

export default AutContext;
