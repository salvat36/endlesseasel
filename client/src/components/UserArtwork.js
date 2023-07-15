import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm";
import { UserContext } from "../context/UserProvider";

const UserArtwork = () => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const {updateUser, user} = useContext(UserContext)

  const toggleForm = () => {
    setShowForm((showForm) => !showForm);
  };

  const handleDeleteUserArtwork = (id) => {
    fetch(`/user-artworks/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        updateUserArtwork(id);
        alert("Successfully Deleted User-Book");
      }
    });
  };

  const handleDeleteUser = () => {
    fetch(`users/${user.id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        history.push("/");
        updateUser(null);
      } else {
        alert("Unable to delete user");
      }
    });
  };

  const updateUserArtwork = (id) => {
    updateUser(
      {...user, artworks: user.artworks.filter(artwork => (id !== artwork.id))}
  )
  }

  const userArtworksList = user?.artworks.map((artwork) => (
    <>
      <div key={artwork.id}> {artwork.title}</div>
      <img src={artwork.image} alt={artwork.title} />
      <button onClick={() => handleDeleteUserArtwork(artwork.id)}>
        Remove
      </button>
    </>
  ));

  return (
    <>
      <div>User Profile for {user?.username} </div>
      <button onClick={handleDeleteUser}>Delete Profile</button>
      <button onClick={toggleForm}>Edit Profile</button>
      {showForm ? <UpdateUserForm /> : null}
      <div>{userArtworksList}</div>
    </>
  );
};

export default UserArtwork;
