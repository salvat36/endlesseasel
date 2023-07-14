import React from "react";
import { Link } from "react-router-dom";

const ArtGallery = ({ title, image, id }) => {
  return (
    <div>
      <Link to={`/artworks/${id}`}>
        <img src={image} alt={title} />
      </Link>
    </div>
  );
};

export default ArtGallery;
