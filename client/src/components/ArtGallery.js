import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const ArtGallery = ({ title, image, id, genre }) => {
  return (
    <Box>
      <Link to={`/artworks/${id}`}>
        <img src={image} alt={`Title: ${title} - Genre:${genre}`} style={imageStyle} />
      </Link>
    </Box>
  );
};

export default ArtGallery;
