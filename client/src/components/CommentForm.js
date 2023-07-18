import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const CommentForm = ({ handleAddReview, artwork_id }) => {
  const { setError, error } = useContext(ErrorContext);
  const history = useHistory();
  const updateSchema = yup.object().shape({
      rating: yup
      .number()
      .required("Rating is required")
      .min(1)
      .max(10),
    description: yup
      .string()
      .matches(/^[a-zA-Z\s.,!?;:'"-]+$/, "Description can only contain spaces, letters or punctuation!?")
      .required("Description is required")
      .min(5)
      .max(100),
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
        body: JSON.stringify({ ...values, artwork_id: artwork_id }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            handleAddReview(res);
            resetForm({ valies: "" });
          });
        } else {
          res.json().then((error) => setError([error.error]));
        }
      });
    },
  });
  return (
    <div>
      <h1>Share your critique with the artist!</h1>
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
          {formik.errors.rating && formik.touched.rating && (
            <Typography variant='body2' color='error'>
              {formik.errors.rating}
            </Typography>
          )}
        </>
        <>
          <label>Comment: </label>
          <input
            type="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Comment"
          />
          {formik.errors.description && formik.touched.description && (
            <Typography variant='body2' color='error'>
              {formik.errors.description}
            </Typography>
          )}
        </>
        <Button variant="contained" color="neutral"  type="submit">Add a Review</Button>
      </form>
    </div>
  );
};

export default CommentForm;
