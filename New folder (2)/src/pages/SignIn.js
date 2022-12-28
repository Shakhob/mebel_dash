import { useState } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.login, values.password);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container height="100vh">
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            bgcolor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Welcome back</Typography>
          <Typography variant="body1">Please enter your detatils.</Typography>
          <Formik
            initialValues={{ login: "", password: "" }}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.login) {
            //     console.log(values);
            //     errors.login = "Required";
            //   } else if (!/[a-zA-Z0-9,\.\_]$/i.test(values.login)) {
            //     errors.login = "Invalid email address";
            //   }
            //   return errors;
            // }}
            onSubmit={handleFormSubmit}
            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //   }, 400);
            // }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form style={{ marginTop: "50px", width: "40%" }}>
                <Grid container spacing={4} direction="column">
                  <Grid item md={4}>
                    <TextField
                      onChange={handleChange}
                      value={values.login}
                      fullWidth
                      type="text"
                      name="login"
                      label="Login"
                    />
                    <ErrorMessage
                      name="login"
                      component="div"
                      sx={{ color: "red" }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      onChange={handleChange}
                      value={values.password}
                      fullWidth
                      type="password"
                      name="password"
                      label="Password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      fullWidth
                      sx={{
                        height: "56px",
                        boxShadow: "none",
                        background: "#d95795",
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            bgcolor: "#d95795",
            overflow: "hidden",
            height: "100vh",
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img
            src={require("../assets/image/mebel.jpg")}
            alt="chair"
            height="100%"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
