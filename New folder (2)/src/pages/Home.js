import { useState } from "react";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Form, Formik } from "formik";

const Home = () => {
  const [data, setData] = useState({
    picture: "",
    name: "",
    address: "",
    location: "",
    phone: "",
  });
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://mebeluz.tmweb.ru/dashboard/profile.php",
      headers: {
        token: localStorage.getItem("accessToken"),
        lang: "uz",
      },
    }).then((a) => setData(a.data.data));
  }, []);

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      onSubmit={async (values) => {
        let formData = new FormData();
        formData.append("photo", values.photo);

        await axios({
          method: "post",
          url: "https://mebeluz.tmweb.ru/dashboard/profile.php",
          data: formData,
          params: {
            action: "edit",
            name: values.name,
            phone: values.phone,
            address: values.address,
            location: values.location,
          },
          headers: {
            token: localStorage.getItem("accessToken"),
            lang: "uz",
            "content-type": "multipart/form-data",
          },
        }).then((a) => a.data.status === "OK" && setIsDisable(!isDisable));
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Container maxWidth="xl">
            <Grid container rowSpacing={4}>
              <Grid item md={12} xs={6}>
                <Grid
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    onChange={(e) =>
                      setFieldValue("photo", e.currentTarget.files[0])
                    }
                    style={{
                      position: "absolute",
                      height: "121px",
                      width: "121px",
                      top: "-21px",
                      left: "-10px",
                      zIndex: 1,
                      borderRadius: "50%",
                    }}
                  />
                  <Avatar
                    src={
                      "https://mebeluz.tmweb.ru/" + (data && data.picture) ||
                      null
                    }
                    variant="circular"
                    sx={{ width: "100px", height: "100px" }}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={4}>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    label="Name"
                    value={values.name || ""}
                    onChange={handleChange}
                    disabled={isDisable}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="phone"
                    label="Phone"
                    value={values.phone || ""}
                    onChange={handleChange}
                    disabled={isDisable}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="address"
                    label="Address"
                    value={values.address || ""}
                    onChange={handleChange}
                    disabled={isDisable}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="location"
                    label="Location"
                    value={values.location || ""}
                    onChange={handleChange}
                    disabled={isDisable}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ height: "56px", boxShadow: "none" }}
                    onClick={() => setIsDisable(!isDisable)}
                  >
                    Edit
                  </Button>
                </Grid>
                {!isDisable && (
                  <Grid item md={4} xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{ height: "56px", boxShadow: "none" }}
                    >
                      Save
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Home;
