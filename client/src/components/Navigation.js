import React from "react";
import { Link } from "react-router-dom";

const Navigation = ( {handleLogoutClick} ) => {
  return (
    <>
      <button onClick={handleLogoutClick}>Logout</button>
      <Link to="/"> Home </Link>
      <Link to="/shop"> Shop </Link>
      <Link to="/user-artworks"> Profile </Link>
      <Link to="/contact"> Contact Us</Link>
    </>
  );
};

export default Navigation;
