import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Register = ( {updateUser} ) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();


  const handleClick = () => {
    setIsLoggedIn((isLoggedIn) => !isLoggedIn)
  }

    const registerSchema = yup.object().shape({
        username: yup
        .string()
        .required('Username is required')
        .min(8)
        .max(30),
        
        password: yup
        .string()
        .required('Password is required')
        .min(8)
        .max(100),

        email: yup
        .string()
        .required('Email is required')
        .email()
        .min(5)
        .max(30)
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        validationSchema: registerSchema,
        onSubmit: (values, { resetForm }) => {
          fetch(isLoggedIn ? '/signup': '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
          .then((res) => {
            if (res.ok) {
              res.json().then((res) => {
                updateUser(res);
                resetForm();
                history.push('/')
              })
            } else {
              //! res.json()
              //!.then((error) => setError([error.error]))
            }
          })
        }
    })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <>
        <label>Username: </label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.username && formik.touched.username} <div>{formik.errors.username}</div>
        </>
        <>
        <label>Password: </label>
        <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password} <div>{formik.errors.password}</div>
        </>
        <>
        <label>Email: </label>
        <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email} <div>{formik.errors.email}</div>
        </>
        <button type='submit' onClick={handleClick}> {isLoggedIn? 'Create' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Register