import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Typography from "@mui/material/Typography";
import { Button, Container, Box, TextField } from "@mui/material";

const PromptForm = ({ handleAddPrompt, user_id }) => {
  const [imageURL, setImageURL] = useState("");
  const { setError, error } = useContext(ErrorContext);
  const history = useHistory();
  const createSchema = yup.object().shape({
    genre: yup.string().required("Genre is required").min(1).max(10),
    price: yup
      .number()
      .positive("Price must be a positive number")
      .required("Price is required")
      .min(5)
      .max(100),
    title: yup.string().required("Title is Required").min(1).max(30),
    prompt: yup
      .string()
      .matches(
        /^[a-zA-Z\s.,!?;:'"-]+$/,
        "Prompt can only contain spaces, letters or punctuation!?"
      )
      .required("Image Prompt Required")
      .min(5)
      .max(100),
  });

  const formik = useFormik({
    initialValues: {
      genre: "",
      price: "",
      title: "",
      prompt: "",
    },
    validationSchema: createSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const createImageResponse = await fetch("/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: values.prompt }),
        });

        if (createImageResponse.ok) {
          const imageResponseData = await createImageResponse.json();
          const imageURL = imageResponseData.image_url;
          setImageURL(imageURL);

          const createArtworkResponse = await fetch("/artworks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, image: imageURL }),
          });

          if (createArtworkResponse.ok) {
            const newArtworkData = await createArtworkResponse.json();
            handleAddPrompt(newArtworkData);
            resetForm();
          } else {
            const error = await createArtworkResponse.json();
            setError(error.error);
          }
        } else {
          const error = await createImageResponse.json();
          setError(error.error);
        }
      } catch (error) {
        setError(["Something went wrong.  Please try again"]);
      }
    },
  });

  return (
    <Container  display="flex">
      <Box
        mt={5}
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width='100%'
      >
        <Typography variant="h4" gutterBottom>
          Generate an Image!
        </Typography>
        <Box>
          <TextField
            label="genre"
            variant="outlined"
            fullWidth
            margin="normal"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
          />

          <TextField
            label="price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Prompt"
            variant="outlined"
            fullWidth
            margin="normal"
            name="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.prompt && Boolean(formik.errors.prompt)
            }
            helperText={formik.touched.prompt && formik.errors.prompt}
          />
          <Box display='flex' justifyContent='center'>
            <Button type="submit" variant="contained" color="neutral">
          Create Your Masterpiece!
            </Button>
          </Box>
          <Box display='flex' alignContent='center' paddingTop={5}>
            {imageURL && (
              <Box display='flex' alignContent='center' paddingRight={5}>
                <Typography variant="h2">and voilà!</Typography>
                <img
                  src={imageURL}
                  alt={`${formik.values.title} ${formik.values.genre}`}
                />
              </Box>
            )}
          </Box>
          {error ? <Error /> : <></>}
        </Box>
      </Box>
    </Container>
  );
};

export default PromptForm;
