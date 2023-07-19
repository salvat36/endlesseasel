import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h1'>Home</Typography>
      <img
        src="https://images.nightcafe.studio/jobs/YbfjF0xAPTQHTkbeCSCU/YbfjF0xAPTQHTkbeCSCU--1--1iy5g.jpg?tr=w-828,c-at_max"
        alt="How to Video: for navigating site features"
      />
    </Box>
  );
};

export default Home;
