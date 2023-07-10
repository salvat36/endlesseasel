import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserArtwork = ({ user, updateArtworks }) => {
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

  // const handleDeleteUserArtwork = () => {
  //   fetch(`/user-artworks/${artId}`, {method: 'DELETE'})
  //   .then((res) => {
  //     if (res.ok) {
  //       updateArtworks([])
  //       alert("Successfully Deleted User-Book")
  //     }
  //   });
  // }

  const userArtworksList = user?.artworks.map((artwork) => (
    <>
      <div key={artwork.id}> {artwork.title}</div>
      <img src={artwork.image} alt={artwork.title} />
      {/* <button onClick={handleDeleteUserArtwork}>Remove</button> */}
    </>
  ));

  return <div>{userArtworksList}</div>;
};

export default UserArtwork;
