import {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserProvider'
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory()
  const { handleLogoutClick, user } = useContext(UserContext)
  return (
    <>
      {user? <button onClick={handleLogoutClick}>Logout</button> : null}
      <Link to="/"> Home </Link>
      <Link to="/shop"> Shop </Link>
      <Link to="/user-artworks"> Profile </Link>
      <Link to="/contact"> Contact Us</Link>
    </>
  );
};

export default Navigation;
