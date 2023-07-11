import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UpdateUserForm from "./UpdateUserForm";

const UserArtwork = ({ user, updateArtworks, updateUserArtwork, updateUser }) => {
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(showForm => !showForm)
  }

  const handleDeleteUserArtwork = (id) => {
    fetch(`/user-artworks/${id}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        updateUserArtwork(id);
        alert("Successfully Deleted User-Book");
      }
    });
  };

  const handleDeleteUser = () => {
    fetch(`users/${user.id}`, { method: 'DELETE'})
      .then ((res) => {
        if (res.ok) {
          updateUser(null)
          history.push('/login')
        } else {
          alert('Unable to delete user')
        }
      })
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
      {showForm? (<UpdateUserForm user={user} updateUser={updateUser}/>) : null}
      <div>{userArtworksList}</div>
    </>
  );
};

export default UserArtwork;
