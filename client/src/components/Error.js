import { useContext } from 'react'
import { ErrorContext } from "../context/ErrorProvider";

const Error = () => {
const {setError, error} = useContext(ErrorContext)
  return (
    <div>{error}</div>
  )
}

export default Error