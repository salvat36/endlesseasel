import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h1' sx={{ marginBottom: '1rem' }}> Contact Us </Typography>
      <Typography variant='body1'>         
      Thank you for visiting our website. If you have any questions, feedback
        or inquiries, please don't hesitate to contact us. We value your
        opinions and are always here to help!
        </Typography>
        <Typography variant='body1'>         
        You can reach us through the following methods:
        </Typography>

      <List>
        <ListItem>Email: EndlessEasel@gmail.com</ListItem>
        <ListItem>Phone: 1-888-PaintByLetters</ListItem>
        <ListItem>Address: 555 Route 1, Laguna Beach, CA</ListItem>
      </List>
      <Typography variant="body1">
        Thank you again for your interest in our products/services. We look
        forward to hearing from you!
        </Typography>
    </Box>
  );
};

export default Contact;
