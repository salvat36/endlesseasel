import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { UserContext } from "../context/UserProvider";
import { ErrorContext } from "../context/ErrorProvider";
import Error from "./Error";
import Comment from "./Comment";
import { Box, Button, Typography } from "@mui/material";

const ArtDetail = () => {
  const [artwork, setArtwork] = useState([]);
  const [reviews, setReviews] = useState([]);
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
    setReviews((reviews) => [newReview, ...reviews]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h1"> Art Detail </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">Title: {title}</Typography>
          <Typography variant="h4">Style: {genre}</Typography>
          <Typography variant="h4">Price: ${price}</Typography>
        </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </Box>
      {error ? <Error /> : <></>}
      <Button variant="contained" color="neutral" onClick={handleAddArtwork}>Add to Collection</Button>
      <Box sx={{ mt: 2}}>
        <Link to="/shop">
          <Button variant="contained" color="secondary" >Back to Exploring</Button>
        </Link>
      </Box>
      <CommentForm
        reviews={reviews}
        handleAddReview={handleAddReview}
        artwork_id={artwork.id}
      />
      <ul>{mappedReviews}</ul>
    </Box>
  );
};

export default ArtDetail;
