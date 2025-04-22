// // backend/routes/images.js

// const express = require('express')
// const router = express.Router()
// const axios = require('axios')
// require('dotenv').config()

// // Placeholder config - Replace with actual API endpoints and keys
// const MODEL_APIS = {
//   anime: 'https://api.example.com/anime-generate',
//   ghibli: 'https://api.example.com/ghibli-generate',
//   real: 'https://api.example.com/realistic-generate'
// }

// router.post('/generate', async (req, res) => {
//   const { prompt, style } = req.body

//   if (!prompt || !style || !MODEL_APIS[style]) {
//     return res.status(400).json({ error: 'Invalid prompt or style' })
//   }

//   try {
//     // Replace with real image generation API request
//     const response = await axios.post(MODEL_APIS[style], {
//       prompt
//     }, {
//       headers: {
//         Authorization: `Bearer ${process.env.IMAGE_API_KEY}`
//       }
//     })

//     // Assuming the response contains an image URL
//     res.json({ image: response.data.image_url || response.data.url })
//   } catch (err) {
//     console.error('Image generation error:', err.message)
//     res.status(500).json({ error: 'Failed to generate image' })
//   }
// })

// module.exports = router
// /backend/routes/images.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config();

// Placeholder config - Replace with actual API endpoints and keys
const VIDEO_GENERATION_API = 'https://api.example.com/video-generate'; // Video generation API endpoint

// Video Generation Route
router.post('/generate-video', async (req, res) => {
  const { prompt, style, noteContent, userId } = req.body;

  if (!prompt || !style || !noteContent) {
    return res.status(400).json({ error: 'Invalid input, prompt, style, or content missing' });
  }

  try {
    // Step 1: Generate Image based on prompt and style (using existing Image Generation API)
    const imageRes = await axios.post('http://localhost:5000/api/images/generate', { prompt, style });
    const imageUrl = imageRes.data.image;

    // Step 2: Text-to-Speech (TTS) for the note content
    const ttsRes = await axios.post('http://localhost:5000/api/tts', { content: noteContent });
    const audioUrl = ttsRes.data.audioUrl; // Link to the audio file

    // Step 3: Generate Video (combine images and audio)
    const videoFilePath = await generateVideo(imageUrl, audioUrl, userId);

    res.json({ videoUrl: `/videos/${videoFilePath}` });

  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// Helper function to create a video using FFmpeg
const generateVideo = (imageUrl, audioUrl, userId) => {
  return new Promise((resolve, reject) => {
    // Download the image and audio files (simulated here)
    const imagePath = `./public/images/${userId}.jpg`;
    const audioPath = `./public/audio/${userId}.mp3`;

    // Download image and audio (simulated step)
    downloadFile(imageUrl, imagePath);
    downloadFile(audioUrl, audioPath);

    // Generate the video with FFmpeg
    const videoOutputPath = `./public/videos/${userId}.mp4`;

    exec(`ffmpeg -loop 1 -i ${imagePath} -i ${audioPath} -c:v libx264 -tune stillimage -pix_fmt yuv420p -c:a aac -b:a 192k -shortest ${videoOutputPath}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(videoOutputPath); // Return path of generated video
      }
    });
  });
};

// Helper function to download a file (Image or Audio) from a URL
const downloadFile = (url, path) => {
  const file = fs.createWriteStream(path);
  axios({
    method: 'get',
    url,
    responseType: 'stream',
  })
    .then((response) => {
      response.data.pipe(file);
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
    });
};

module.exports = router;
