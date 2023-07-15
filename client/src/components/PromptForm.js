import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";

const PromptForm = ( {handleAddPrompt, user_id} ) => {
    const {setError, error} = useContext(ErrorContext)
    const history = useHistory()
    const updateSchema = yup.object().shape({
      genre: yup.number().required("Rating is required").min(1).max(10),
      price: yup.string().required("Description is required").min(5).max(100),
      title: yup.string().required('Title is Required'),
      image: yup.string().required('Image Prompt Required'),
    });
  
  
    const formik = useFormik({
      initialValues: {
        genre: '',
        price: '',
        title: '',
        image: ''
      },
      validationSchema: updateSchema,
      onSubmit: (values, { resetForm }) => {
        fetch('/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({...values, user_id : user_id}),
          body: JSON.stringify( values ),
        }).then((res) => {
          if (res.ok) {
            res.json().then((res) => {
            //   handleAddPrompt(res);
              resetForm();
            });
          } else {
            res.json().then((error) => setError([error.error]));
          }
        });
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
              type="Price"
              name="Price"
              value={formik.values.Price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Price"
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
        </form>
      </div>
    );
  };
  
  export default PromptForm;