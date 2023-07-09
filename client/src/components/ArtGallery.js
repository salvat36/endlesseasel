import React from "react";

const ArtGallery = ({ genre, price, title, image }) => {
  return (
    <div>
      <img src={image} alt={title} />
    </div>
  );
};

export default ArtGallery;
