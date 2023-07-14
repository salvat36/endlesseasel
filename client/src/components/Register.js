import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";

const Register = () => {
  const history = useHistory();
  const { handleRegister, handleLogin, isLoggedIn } = useContext(UserContext);
  const { error } = useContext(ErrorContext)
  const { user } = useContext(UserContext);

  const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),
    password: yup.string().required("Password is required").min(8).max(100),
    email: yup.string().required("Email is required").email().min(5).max(30),
  });

  const signInSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),
    password: yup.string().required("Password is required").min(8).max(100),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: !isLoggedIn ? registerSchema : signInSchema,
    onSubmit: (values, { resetForm }) => {
      handleRegister(values);
      resetForm();
      history.push("/");
    },
  });

  if (user) {
    return null;
  }
  return (

    <div>
      <h1> Please Login or Signup!</h1>
      <h2>{isLoggedIn ? "Already a User?" : "Not a User?"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          />
          {formik.errors.password && formik.touched.password}{" "}
          <div>{formik.errors.password}</div>
        </>
        {!isLoggedIn ? (
          <>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email}{" "}
            <div>{formik.errors.email}</div>
          </>
        ) : null}
        <input type="submit" value={isLoggedIn ? "Login" : "Create"} />{" "}
      </form>
      <span>
        {isLoggedIn ? "Need a new account?" : "Already have an account?"}
        <button onClick={handleLogin}>
          {" "}
          {isLoggedIn ? "Create" : "Login"}{" "}
        </button>
      </span>
      {error? <Error/> : <></>}
    </div>
  );
};

export default Register;
