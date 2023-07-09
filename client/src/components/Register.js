import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Register = ( {updateUser} ) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

    const registerSchema = yup.object().shape({
        username: yup
        .string()
        .required('Username is required')
        .min()
        .max(),
        
        password: yup
        .string()
        .required('Password is required')
        .min()
        .max(),

        email: yup
        .string()
        .required('Email is required')
        .email()
        .min()
        .max()
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
        <label>Username</label>
        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.username && formik.touched.username} <div>{formik.errors.username}</div>
        </>
        <>
        <label>Password</label>
        <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password} <div>{formik.errors.password}</div>
        </>
        <>
        <label>Email</label>
        <input type='text' name='text' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email} <div>{formik.errors.email}</div>

        
        </>
        
      </form>
    </div>
  )
}

export default Register