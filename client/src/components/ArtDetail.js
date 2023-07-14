import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";
import { UserContext } from "../context/UserProvider";

const ArtDetail = () => {
  const [artwork, setArtwork] = useState([]);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const { genre, price, title, image } = artwork;
  const { updateUser, user } = useContext(UserContext);

  useEffect(() => {
    Promise.all([
      fetch(`/artworks/${id}`),
      fetch(`/artworks/${id}/reviews`),
    ]).then((values) => {
      if (values[0].ok) {
        values[0].json().then(setArtwork);
      } else {
        alert("Artwork Not Found");
      }

      if (values[1].ok) {
        values[1]
          .json()
          .then(setReviews)
          .catch((err) => console.log(err));
      }
    });
  }, [id]);

  const addUserArtwork = (artwork) => {
    updateUser({ ...user, artworks: [...user.artworks, artwork] });
  };

  // ! REFACTOR TO REVIEWS COMPONENT?
  const mappedReviews = reviews?.map((review) => (
    <ul>
      <li>Customer Rating: {review.rating}/10</li>
      <li>Customer Review: {review.description}</li>
    </ul>
  ));
  // !!!!!!!!!!!!!!!!!!!!

  const handleAddArtwork = () => {
    fetch("/user-artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) {
        addUserArtwork(artwork);
      } else {
        alert("something went wrong");
      }
    });
  };

  const handleAddReview = (newReview) => {
    setReviews(reviews => [...reviews, newReview]);
  };

  return (
    <div>
      <h1>Art Detail</h1>
      <h2>Title: {title}</h2>
      <h2>Genre: {genre}</h2>
      <h2>Price: ${price}</h2>
      <img src={image} alt={title} />
      <button onClick={handleAddArtwork}>Add to Collection</button>
      <CommentForm
        reviews={reviews}
        handleAddReview={handleAddReview}
        artwork_id={artwork.id}
      />
      <ul>{mappedReviews}</ul>
    </div>
  );
};

export default ArtDetail;
