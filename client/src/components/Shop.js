import React, { useEffect, useState } from "react";
import ArtGallery from "./ArtGallery";
import { Box, Typography } from "@mui/material";

const Shop = ({ artworks }) => {

const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '20px',
};

  return (
    <Box>
      <Typography variant='h1'>Art Gallery</Typography>
      <Box sx={galleryStyle}>
      {artworks.map((artwork) => (
    <ArtGallery key={artwork.id} {...artwork} />
  ))}
      </Box>
    </Box>
  );
};

export default Shop;
