import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";

const PromptForm = ({ handleAddPrompt, user_id }) => {
  const [imageURL, setImageURL] = useState("");
  const { setError } = useContext(ErrorContext);
  const history = useHistory();
  const createSchema = yup.object().shape({
    genre: yup.number().required("Rating is required").min(1).max(10),
    price: yup.string().required("Description is required").min(5).max(100),
    title: yup.string().required("Title is Required"),
    prompt: yup.string().required("Image Prompt Required"),
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
          //   body: JSON.stringify({...values, user_id : user_id}),
          body: JSON.stringify({ prompt: values.prompt }),
        });

        if (createImageResponse.ok) {
          const imageResponseData = await createImageResponse.json();
          const imageUrl = imageResponseData.image_url;

          const createArtworkResponse = await fetch("/artworks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values, image: imageUrl }),
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
          <label>Genre: </label>
          <input
            type="text"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Genre"
          />
          {formik.errors.genre && formik.touched.genre}{" "}
          <div>{formik.errors.genre}</div>
        </>
        <>
          <label>Price: </label>
          <input
            type="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="price"
          />
          {formik.errors.price && formik.touched.price}{" "}
          <div>{formik.errors.price}</div>
        </>
        <>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="title"
          />
          {formik.errors.title && formik.touched.title}{" "}
          <div>{formik.errors.title}</div>
        </>
        <>
          <label>Image Prompt: </label>
          <input
            type="text"
            name="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="prompt"
          />
          {formik.errors.prompt && formik.touched.prompt}{" "}
          <div>{formik.errors.prompt}</div>
        </>
        <button type="submit">Generate a New Image</button>
        <div>
          {imageURL && (
            <>
              <h2>Generated Image:</h2>
              <img src={imageURL} alt="Generated Image" />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
