import React from "react";
import PromptForm from "./PromptForm";
import { Box, Container, Typography } from "@mui/material";

const Create = ({ updateArtworks }) => {
  const handleAddPrompt = (newPromptArtwork) => {
    updateArtworks((artworks) => [newPromptArtwork, ...artworks]);
  };
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1"> Create </Typography>
        <PromptForm handleAddPrompt={handleAddPrompt} />
      </Box>
  );
};

export default Create;
