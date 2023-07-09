import React, { useEffect, useState } from "react";
import ArtGallery from "./ArtGallery";

const Shop = ( ) => {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    fetch('/artworks')
    .then((res) => res.json())
    .then(setArtworks)
    .catch((err) => console.log(err))
  }, [])

  const mappedArtworks = artworks.map((artwork) => (
    <ArtGallery key={artwork.id} {...artwork} />
  ))


  return (
  <div>
    {mappedArtworks}
  </div>)
};

export default Shop;
