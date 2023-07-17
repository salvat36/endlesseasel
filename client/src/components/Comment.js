import React from 'react'

const Comment = ( {review }) => {
  return (
    <div>
    <ul>
      <li>Customer Rating: {review.rating}/10</li>
      <li>Customer Review: {review.description}</li>
    </ul>
    </div>
  )
}

export default Comment