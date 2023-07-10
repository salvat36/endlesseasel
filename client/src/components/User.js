import { ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const [userArtwork, setUserArtwork] = useState([])
  const {artId} = useParams()

  useEffect(() => {
    fetch(`/user-artworks/${artId}`)
    .then(res => {
        if (res.ok) {
            res.json().then(setUserArtwork)
        } else {
            res.json().then (e => alert(e.message))
        }
    })
    .catch(ErrorMessage)
  }, [artId])

  return <div>User</div>;
};

export default User;
