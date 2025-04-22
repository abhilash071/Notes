// backend/routes/generateImage.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const modelMap = {
  anime: 'cjwbw/anything-v4.0',
  ghibli: 'nandoro/miyazaki-style',
  realistic: 'stability-ai/sdxl'
};

router.post('/', async (req, res) => {
  const { prompt, style } = req.body;

  if (!prompt || !style || !modelMap[style]) {
    return res.status(400).json({ error: 'Invalid prompt or style' });
  }

  try {
    const replicateResponse = await axios.post(
      `https://api.replicate.com/v1/predictions`,
      {
        version: 'latest', // optionally specify version
        input: { prompt }
      },
      {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        params: {
          model: modelMap[style]
        }
      }
    );

    const prediction = replicateResponse.data;
    res.json({ imageUrl: prediction.output[0] });

  } catch (err) {
    console.error('Image generation failed:', err);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

module.exports = router;
