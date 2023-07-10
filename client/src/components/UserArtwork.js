import React from "react";

const UserArtwork = ( {user} ) => {
  const userArtworksList = user?.artworks.map((artwork) => ( 
<div key={artwork.id}> {artwork.title}</div>
  ));
  
  
  
  
  
  
  
  
  return (
  <div>
    {userArtworksList}
  </div>
  )
};

export default UserArtwork;
