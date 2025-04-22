const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');  // Import notes routes
const translateRoutes = require('./routes/translate');
const imageRoutes = require('./routes/images')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);  // Use notes routes
app.use('/api/translate', translateRoutes);
mongoose.connect('mongodb://127.0.0.1:27017/notesdb')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


