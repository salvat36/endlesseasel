import React from 'react'
import { Link } from "react-router-dom/cjs/react-router-dom";

const Navigation = () => {
  return (
    <>
    <Link to='/'> Home </Link>
    <Link to='/shop'> Shop </Link>
    <Link to='/profile'> Profile </Link>
    <Link to='/contact'> Contact Us</Link>
    </>
  )
}

export default Navigation