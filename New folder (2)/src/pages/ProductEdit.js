import {
  Button,
  TextField,
  Grid,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductEdit = () => {
  const params = useParams();
  const [sections, setActions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    section_id: "",
    name: "",
    price: "",
    name_uz: "",
    sub_category: "",
    text: "",
    photo: "",
    gallery: "",
    prodaction: "",
    material: "",
    mechanism: "",
    model: "",
    color: "",
    style: "",
  });

  useEffect(() => {
    (() => {
      const accessToken = localStorage.getItem("accessToken");

      axios
        .get("https://mebeluz.tmweb.ru/dashboard/sections.php", {
          headers: {
            token: accessToken,
            lang: "uz",
          },
        })
        .then((a) => {
          setActions(a.data.data);
        });

      if (!isNaN(params.listId)) {
        console.log(params.listId);
        axios
          .post(
            "https://mebeluz.tmweb.ru/dashboard/detail.php",
            { product_id: params.listId },
            {
              headers: {
                token: accessToken,
                lang: "uz",
              },
            },
          )
          .then((e) => {
            return e.data.data;
          })
          .then((a) => {
            setInitialValues({
              name: a.name,
              section_id: a.section,
              price: a.price,
              name_uz: a.name_uz,
              sub_category: a.sub_category,
              text: a.text,
              photo: a.image,
              gallery: a.gallery,
              prodaction: a.prodaction,
              material: a.material,
              mechanism: a.mechanism,
              model: a.model,
              color: a.color,
              style: a.style,
            });
          });
      }
    })();
  }, [params.listId]);

  return (
    <>
      <Typography variant="h5" mb={5}>
        {!isNaN(params.listId) ? "Product Edit" : "Product Add"}
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (values) => {
          const accessToken = localStorage.getItem("accessToken");

          let formData = new FormData();
          formData.append("photo", values.photo);
          formData.append("gallery", values.gallery);
          const config = !isNaN(params.listId)
            ? {
                method: "post",
                url: "https://mebeluz.tmweb.ru/dashboard/action.php",
                params: {
                  section_id: values.section_id,
                  name: values.name,
                  price: values.price,
                  name_uz: values.name_uz,
                  sub_category: values.sub_category,
                  text: values.text,
                  prodaction: values.prodaction,
                  material: values.material,
                  mechanism: values.mechanism,
                  model: values.model,
                  color: values.color,
                  style: values.style,
                  action: "edit",
                  product_id: params.listId,
                },
                data: formData,
                headers: {
                  "content-type": "multipart/form-data",
                  token: accessToken,
                },
              }
            : {
                method: "post",
                url: "https://mebeluz.tmweb.ru/dashboard/action.php",
                params: {
                  action: "add",
                  section_id: +values.section_id,
                  name: values.name,
                  price: values.price,
                  name_uz: values.name_uz,
                  sub_category: values.sub_category,
                  text: values.preview_text,
                  prodaction: values.prodaction,
                  material: values.material,
                  mechanism: values.mechanism,
                  model: values.model,
                  color: values.color,
                  style: values.style,
                },
                data: formData,
                headers: {
                  "content-type": "multipart/form-data",
                  token: accessToken,
                },
              };

          await axios(config);
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container maxWidth="xl">
              <Grid container spacing={4}>
                {sections && sections.length > 0 && (
                  <Grid item md={4} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Section
                      </InputLabel>
                      <Select
                        defaultValue={values.section_id}
                        name="section_id"
                        // value={values.section_id}
                        label="Section"
                        onChange={handleChange}
                        color="primary"
                      >
                        {sections.map((e, i) => (
                          <MenuItem key={i} value={e.id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <ErrorMessage name="password" component="div" />
                  </Grid>
                )}
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name"
                    label="Name"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    name="price"
                    label="Price"
                    onBlur={handleBlur}
                    value={values.price}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="name_uz"
                    label="Name uz"
                    onBlur={handleBlur}
                    value={values.name_uz}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="sub_category"
                    label="Sub category"
                    onBlur={handleBlur}
                    value={values.sub_category}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="text"
                    label="Preview text"
                    onBlur={handleBlur}
                    value={values.text}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="prodaction"
                    label="Production"
                    onBlur={handleBlur}
                    value={values.prodaction}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="material"
                    label="Material"
                    onBlur={handleBlur}
                    value={values.material}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="color"
                    label="Color"
                    onBlur={handleBlur}
                    value={values.color}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="style"
                    label="Style"
                    onBlur={handleBlur}
                    value={values.style}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="mechanism"
                    label="Mechanism"
                    onBlur={handleBlur}
                    value={values.mechanism}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="model"
                    label="Model"
                    onBlur={handleBlur}
                    value={values.model}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    sx={{
                      height: "56px",
                      boxShadow: "none",
                      backgroundColor: "#f6f6f8",
                      border: "1px solid #bdbdbf",
                      textTransform: "initial",
                      justifyContent: "left",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontSize: "1rem",
                      fontWeight: "400",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "#f6f6f8",
                        borderColor: "#000",
                      },
                    }}
                  >
                    Gallery
                    <input
                      type="file"
                      name="gallery"
                      accept="image/*"
                      multiple
                      hidden
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("gallery", e.currentTarget.files[0])
                      }
                    />
                  </Button>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    component="label"
                    sx={{
                      height: "56px",
                      boxShadow: "none",
                      backgroundColor: "#f6f6f8",
                      border: "1px solid #bdbdbf",
                      textTransform: "initial",
                      justifyContent: "left",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontSize: "1rem",
                      fontWeight: "400",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "#f6f6f8",
                        borderColor: "#000",
                      },
                    }}
                  >
                    Photo
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      hidden
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("photo", e.currentTarget.files[0])
                      }
                    />
                  </Button>
                  <ErrorMessage name="password" component="div" />
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      height: "56px",
                      boxShadow: "none",
                      background: "#d95795",
                      "&:hover": {
                        boxShadow: "none",
                        background: "#d95795",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductEdit;
