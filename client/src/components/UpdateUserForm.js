import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, TextField } from "@mui/material";

const UpdateUserForm = ({ toggleForm }) => {
  const history = useHistory();
  const { user, updateUser } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const pwRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const updateSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(8).max(30),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        pwRegEx,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
      )
      .min(8)
      .max(100),

    email: yup.string().required("Email is required").email().min(5).max(30),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: "",
      email: user.email,
    },
    validationSchema: updateSchema,
    onSubmit: (values, { resetForm }) => {
      fetch(`users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            updateUser(res);
            resetForm();
            history.push("/user-artworks");
            toggleForm();
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
          Update Your Profile
        </Typography>
        <Box width="100%">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          color="neutral"
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </Box>
      {error ? <Error /> : <></>}
    </Container>
  );
};

export default UpdateUserForm;
