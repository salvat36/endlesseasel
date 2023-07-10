import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const ArtDetail = () => {
  const [artwork, setArtwork] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const { genre, price, title, image } = artwork;

  useEffect(() => {
    fetch(`/artworks/${id}`).then((res) => {
      if (res.ok) {
        res.json().then(setArtwork);
      } else {
        alert("Artwork Not Found");
      }
    });
  }, [id]);

  return (
    <div>
      <h1>Art Detail</h1>
      <h2>Title: {title}</h2>
      <h2>Genre: {genre}</h2>
      <h2>Price: ${price}</h2>
      <img src={image} alt={title} />
    </div>
  );
};

export default ArtDetail;
