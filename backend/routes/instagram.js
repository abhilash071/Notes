const express = require('express');
const axios = require('axios');
const router = express.Router();

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;

// OAuth2 Authentication for Instagram
router.get('/auth', (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

// Handle Instagram callback and exchange code for token
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Code is missing from the request' });
  }

  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    });

    const { access_token, user_id } = response.data;
    // Store the access token and user_id for further use (e.g., to post to Instagram)
    res.json({ access_token, user_id });
  } catch (error) {
    console.error('Error during Instagram OAuth callback:', error);
    res.status(500).json({ error: 'Instagram authentication failed' });
  }
});

// Post to Instagram (after post creation)
router.post('/post', async (req, res) => {
  const { access_token, image_url, caption } = req.body;

  if (!access_token || !image_url || !caption) {
    return res.status(400).json({ error: 'Missing required fields: access_token, image_url, caption' });
  }

  try {
    // Post image to Instagram (requires Instagram Graph API)
    const mediaResponse = await axios.post(
      `${INSTAGRAM_API_URL}/me/media?image_url=${image_url}&caption=${caption}&access_token=${access_token}`
    );

    const mediaId = mediaResponse.data.id;

    // Publish the post
    await axios.post(
      `${INSTAGRAM_API_URL}/me/media_publish?creation_id=${mediaId}&access_token=${access_token}`
    );

    res.json({ success: true, message: 'Post successfully published to Instagram' });
  } catch (error) {
    console.error('Error posting to Instagram:', error);
    res.status(500).json({ error: 'Failed to post to Instagram' });
  }
});

module.exports = router;
