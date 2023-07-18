import {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserProvider'
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory()
  const { handleLogoutClick, user } = useContext(UserContext)
  return (
    <>
    <div>TESTING</div>
      {user && <Link onClick={handleLogoutClick}>Logout</Link>} 
      <Link to="/"> Home </Link>
      {user && <Link to="/shop"> Explore </Link>}
      {user && <Link to="/user-artworks"> Personal Portfolio </Link>}
      {user && <Link to="/create"> Create Image</Link>}
      <Link to="/contact"> Contact Us</Link>
    </>
  );
};

export default Navigation;
