import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";

const CommentForm = ( {handleAddReview, artwork_id} ) => {
  const {setError, error} = useContext(ErrorContext)
  const history = useHistory()
  const updateSchema = yup.object().shape({
    rating: yup.number().required("Rating is required").min(1).max(10),
    description: yup.string().required("Description is required").min(5).max(100),
  });


  const formik = useFormik({
    initialValues: {
      rating: "",
      description: "",
    },
    validationSchema: updateSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(`/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...values, artwork_id : artwork_id}),
      }).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            handleAddReview(res);
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
      <h1>Add a comment</h1>
      <form onSubmit={formik.handleSubmit}>
        <>
          <label>Rating: </label>
          <input
            type="text"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Rate 1/10"
          />
          {formik.errors.rating && formik.touched.rating}{" "}
          <div>{formik.errors.rating}</div>
        </>
        <>
          <label>Description: </label>
          <input
            type="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Review Description"
          />
          {formik.errors.description && formik.touched.description}{" "}
          <div>{formik.errors.description}</div>
        </>
        <button type="submit">Add a Review</button>
      </form>
      {error? <Error/> : <></>}
    </div>
  );
};

export default CommentForm;
