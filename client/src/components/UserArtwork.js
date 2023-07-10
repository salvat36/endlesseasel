import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserArtwork = ({ user, updateArtworks, updateUserArtwork }) => {
  // const { artId } = useParams();
  // const [userArtworks, setUserArtworks] = useState([])

  // useEffect(()=>{
  //   fetch(`/user-artworks/${artId}`)
  //   .then(res => {
  //       if (res.ok) {
  //           res.json().then(setUserArtworks)
  //         } else {
  //             res.json().then(e => alert(e.message))
  //           }
  //       })
  // .catch(console.error)
  // },[artId])

  const handleDeleteUserArtwork = (id) => {
    fetch(`/user-artworks/${id}`, {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        updateUserArtwork(id)
        alert("Successfully Deleted User-Book")
      }
    });
  }

  const userArtworksList = user?.artworks.map((artwork) => (
    <>
      <div key={artwork.id}> {artwork.title}</div>
      <img src={artwork.image} alt={artwork.title} />
      <button onClick={()=>handleDeleteUserArtwork(artwork.id)}>Remove</button>
    </>
  ));

  return (
    <>
  {/* <div>User Profile for {user.username} </div> */}
  {/* <button onClick={handleDeleteUser}>Delete Profile</button>
  <button onClick={handleUpdateUser}>Update Profile</button> */}
  <div>{userArtworksList}</div>;
  </>
  )
};

export default UserArtwork;
