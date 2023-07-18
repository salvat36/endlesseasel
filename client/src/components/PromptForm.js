import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const PromptForm = ({ handleAddPrompt, user_id }) => {
  const [imageURL, setImageURL] = useState("");
  const { setError, error } = useContext(ErrorContext);
  const history = useHistory();
  const createSchema = yup.object().shape({
    genre: yup
      .string()
      .required("Genre is required")
      .min(1)
      .max(10),
    price: yup
      .number()
      .positive("Price must be a positive number")
      .required("Price is required")
      .min(5)
      .max(100),
    title: yup
      .string()
      .required("Title is Required")
      .min(1)
      .max(30),
    prompt: yup
      .string()
      .matches(
        /^[a-zA-Z\s.,!?;:'"-]+$/,
        "Description can only contain spaces, letters or punctuation!?"
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
      image: "",
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
    <div>
      <h1>Generate an Image!</h1>
      <form onSubmit={formik.handleSubmit}>
        <>
          <label>Style: </label>
          <input
            type="text"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Desired Style"
          />
          {formik.errors.genre && formik.touched.genre && (
            <Typography variant='body2' color='error'>
              {formik.errors.genre}
            </Typography>
          )}
        </>
        <>
          <label>Price: </label>
          <input
            type="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Desired Price"
          />
          {formik.errors.price && formik.touched.price && (
            <Typography variant='body2' color='error'>
              {formik.errors.price}
            </Typography>
          )}
        </>
        <>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Desired Title"
          />
          {formik.errors.title && formik.touched.title && (
            <Typography variant='body2' color='error'>
              {formik.errors.title}
            </Typography>
          )}
        </>
        <>
          <label>Art Description </label>
          <textarea
            type="text"
            name="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Whatever your heart desires!"
            rows={5}
            cols={50}
            style={{ resize: "vertical" }}
          />
          {formik.errors.prompt && formik.touched.prompt && (
            <Typography variant='body2' color='error'>
              {formik.errors.prompt}
            </Typography>
          )}
        </>
        <Button variant="contained" color="neutral" type="submit">Create Your Masterpiece!</Button>
        <div>
          {/*!!!!!!!!!!!!! - implement loading component styling here - !!!!!!!!!!!!! */}
          {imageURL && (
            <>
              <h2>and voilà!</h2>
              <img src={imageURL} alt={`${formik.values.title} ${formik.values.genre}`}/>
            </>
          )}
        </div>
        {error ? <Error /> : <></>}
      </form>
    </div>
  );
};

export default PromptForm;
