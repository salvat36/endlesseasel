import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const UpdateUserForm = () => {
  const history = useHistory();
  const {user, updateUser} = useContext(UserContext)
  const updateSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),

    password: yup.string().required("Password is required").min(8).max(100),

    email: yup.string().required("Email is required").email().min(5).max(30),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: '',
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
          });
        } else {
          res.json().then((error) => console.log([error.error]));
        }
      });
    },
  });
  return (
    <div>
      <h1>Edit Profile Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Username"
          />
          {formik.errors.username && formik.touched.username}{" "}
          <div>{formik.errors.username}</div>
        </>
        <>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Password"
          />
          {formik.errors.password && formik.touched.password}{" "}
          <div>{formik.errors.password}</div>
        </>
        <>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Email"
          />
          {formik.errors.email && formik.touched.email}{" "}
          <div>{formik.errors.email}</div>
        </>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
