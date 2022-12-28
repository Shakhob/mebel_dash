import { useContext } from "react";
import AutContext from "../contexts/JWTAuthContext";

const useAuth = () => useContext(AutContext);

export default useAuth;
