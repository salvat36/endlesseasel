import React from "react";
import { Link } from "react-router-dom";

const ArtGallery = ({ title, image, id, genre }) => {
  return (
    <div>
      <Link to={`/artworks/${id}`}>
        <img src={image} alt={`Title: ${title} - Genre:${genre}`} />
      </Link>
    </div>
  );
};

export default ArtGallery;
