// /backend/utils/aiImage.js

const fakeImageUrls = {
    anime: 'https://placekitten.com/512/512',
    ghibli: 'https://placebear.com/512/512',
    real: 'https://placedog.net/512'
  }
  
  async function generateImageFromPrompt(prompt, style) {
    // Replace this with actual API call to Replicate/DALL·E
    return fakeImageUrls[style] || fakeImageUrls.real
  }
  
  module.exports = { generateImageFromPrompt }
  