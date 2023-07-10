import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
