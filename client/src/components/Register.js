import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Register = () => {
    const registerSchema = yup.object().shape({
        username: yup
        .string()
        .required()
        .min()
        .max(),
        
        password: yup
        .string()
        .required()
        .min()
        .max(),

        email: yup
        .string()
        .required()
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
        onSubmit: (values, { resetForm })

    })
  return (
    <div>Register</div>
  )
}

export default Register