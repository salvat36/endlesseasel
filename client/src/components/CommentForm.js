import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { ErrorContext } from "../context/ErrorProvider";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, TextField } from "@mui/material";

const CommentForm = ({ handleAddReview, artwork_id }) => {
  const { setError, error } = useContext(ErrorContext);
  const history = useHistory();
  const updateSchema = yup.object().shape({
    rating: yup.number().required("Rating is required").min(1).max(10),
    description: yup
      .string()
      .matches(
        /^[a-zA-Z\s.,!?;:'"-]+$/,
        "Description can only contain spaces, letters or punctuation!?"
      )
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
    <Container>
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {" "}
          your critique for the artist!
        </Typography>
        <Box width="100%">
          <TextField
            label="Rating"
            variant="outlined"
            fullWidth
            margin="normal"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            color="neutral"
            sx={{ mt: 2 }}
          >
            Comment
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CommentForm;
