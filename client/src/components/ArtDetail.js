import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const ArtDetail = ({ updateUser, user }) => {
  const [artwork, setArtwork] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const { genre, price, title, image, reviews} = artwork;

  useEffect(() => {
    fetch(`/artworks/${id}`).then((res) => {
      if (res.ok) {
        res.json().then(setArtwork)
      } else {
        alert("Artwork Not Found");
      }
    });
  }, [id]);
  
  const addUserArtwork = (artwork) => {
    updateUser({...user, artworks: [...user.artworks, artwork]});
  };

  // ! REFACTOR TO REVIEWS COMPONENT?
  const mappedReviews = reviews?.map((review) => (
    <ul>
    <li>Customer Rating: {review.rating}/10</li>
    <li>Customer Review: {review.description}</li>
    </ul>
  ))

  const handleAddArtwork = () => {
    fetch("/user-artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) {
        addUserArtwork(artwork)
      } else {
        alert("something went wrong");
      }
    });
  };

  // const handleAddReview = () => {

  // }

  return (
    <div>
      <h1>Art Detail</h1>
      <h2>Title: {title}</h2>
      <h2>Genre: {genre}</h2>
      <h2>Price: ${price}</h2>
      <img src={image} alt={title} />
      <button onClick={handleAddArtwork}>Add to Collection</button>
      {/* <button onClick={handleAddReview}>Add Review</button> */}
      <ul>
        {mappedReviews}
      </ul>
    </div>
  );
};

export default ArtDetail;
