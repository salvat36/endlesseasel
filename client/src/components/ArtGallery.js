import React from 'react'

const ArtGallery = ( {genre, price, title, image} ) => {
  return (
    <div>
        <img src={image} alt={title}/>
        <h1>{title}</h1>
    </div>
  )
}

export default ArtGallery