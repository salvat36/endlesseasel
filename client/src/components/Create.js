import React from 'react'
import PromptForm from './PromptForm'

const Create = ( { updateArtworks } ) => {
  const handleAddPrompt = ( newPromptArtwork ) => {
    updateArtworks((artworks) => [...artworks, newPromptArtwork])
  }
  return (
    <>
    <div>Create</div>
    <PromptForm handleAddPrompt={handleAddPrompt}/>
    </>
  )
}

export default Create