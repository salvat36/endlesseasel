import { useFormik } from 'formik';
import * as yup from 'yup';

const Signup = () => {
    const signupSchema = yup.object().shape({
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
            email: ''
        }
    })
  return (
    <div>Signup</div>
  )
}

export default Signup