import React, { useEffect, useState } from "react";

const Shop = () => {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    fetch('/books')
    .then((res) => res.json())
    .then(setArtworks)
    .catch((err) => console.log(err))
  }, [])



  return <div>Shop</div>;
};

export default Shop;
