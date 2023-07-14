import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const { user, handleRegister, handleLogin, isLoggedIn} =
    useContext(UserContext);

  // const handleClick = () => {
  //   updateUser((isLoggedIn) => !isLoggedIn);
  // };

  const registerSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(5).max(30),

    password: yup.string().required("Password is required").min(8).max(100),

    email: yup.string().required("Email is required").email().min(5).max(30),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: !isLoggedIn? registerSchema : null,
    onSubmit: (values, { resetForm }) => {
      handleRegister(values)
      resetForm();
      history.push("/shop");
      // fetch(isLoggedIn ? "/signup" : "/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // }).then((res) => {
      //   if (res.ok) {
      //     res.json().then((res) => {
      //       updateUser(res);
      //       resetForm();
      //       history.push("/");
      //     });
      //   } else {
      //     res.json().then((error) => console.log([error.error]));
      //   }
      // });
    },
  });
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
        {!isLoggedIn ?
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
        </>: null}
        <input type="submit" value={isLoggedIn ? "Login" : "Create"}/>
          {" "}
      </form>
          <span>
            {isLoggedIn ? "Need a new account?" : "Already have an account?"}
            <button onClick={handleLogin}> {isLoggedIn? "Create": "Login"} </button>
          </span>
    </div>
  );
};

export default Register;
