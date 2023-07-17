import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Comment from "./Comment";

const ArtDetail = () => {
  const [artwork, setArtwork] = useState([]);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const { genre, price, title, image } = artwork;
  const { updateUser, user } = useContext(UserContext);
  const { setError, error } = useContext(ErrorContext);

  useEffect(() => {
    Promise.all([
      fetch(`/artworks/${id}`),
      fetch(`/artworks/${id}/reviews`),
    ]).then((values) => {
      if (values[0].ok) {
        values[0].json().then(setArtwork);
      } else {
        setError("Artwork with that id cannot be found");
      }
      if (values[1].ok) {
        values[1].json().then(setReviews);
      } else {
        setError("Artwork or Review cannot be found");
      }
    });
  }, [id, setError]);

  const addUserArtwork = (artwork) => {
    updateUser({ ...user, artworks: [...user.artworks, artwork] });
  };

  const mappedReviews = reviews?.map((review) => <Comment review={review} />);

  const handleAddArtwork = () => {
    fetch("/user-artworks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) {
        addUserArtwork(artwork);
      } else {
        setError("This already exists in your collection!");
      }
    });
  };

  const handleAddReview = (newReview) => {
    setReviews((reviews) => [...reviews, newReview]);
  };

  return (
    <div>
      <h1>Art Detail</h1>
      <h2>Title: {title}</h2>
      <h2>Style: {genre}</h2>
      <h2>Price: ${price}</h2>
      <img src={image} alt={title} />
      {error ? <Error /> : <></>}
      <button onClick={handleAddArtwork}>Add to Collection</button>
      <div>
        <Link to="/shop">
          <button>Back to Exploring</button>
        </Link>
      </div>
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
