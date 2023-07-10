import { ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserArtwork from "./UserArtwork";

const User = () => {
  const [userArtwork, setUserArtwork] = useState([]);
  const { artId } = useParams();

  useEffect(() => {
    fetch(`/user-artworks/${artId}`)
      .then((res) => {
        if (res.ok) {
          res.json().then(setUserArtwork);
        } else {
          res.json().then((e) => alert(e.message));
        }
      })
      .catch(console.error);
  }, [artId]);

  const mappedUserArtworks = userArtwork.map((ua) => (
    <UserArtwork key={ua.id} ua={ua}/>
  ));

  return <div>{mappedUserArtworks}</div>;
};

export default User;
