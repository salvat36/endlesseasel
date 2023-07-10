import React, { useEffect, useState } from "react";
import ArtGallery from "./ArtGallery";

const Shop = ({ artworks }) => {
  const mappedArtworks = artworks.map((artwork) => (
    <ArtGallery key={artwork.id} {...artwork} />
  ));

  return (
    <div>
      <h1>Art Gallery</h1>
      {mappedArtworks}
    </div>
  );
};

export default Shop;
