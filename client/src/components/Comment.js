import React from 'react'
import { Box, Stack, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const Comment = ( {review }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const RatingItem = styled(Item)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  }));

  return (
    <Box sx={{ width: '50%' }}>
    <Stack spacing={2}>
      <Box>
      <RatingItem>Customer Rating: {review.rating}/10</RatingItem>
      <Item>Customer Review: {review.description}</Item>
      </Box>
    </Stack>
    </Box>
  )
}

export default Comment