const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Get all notes for authenticated user
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user });
  res.json(notes);
});
useEffect(() => {
  localStorage.setItem('token', 'YOUR_VALID_JWT_HERE'); // Replace soon!
}, []);

// Create a new note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content, userId: req.user });
  await note.save();
  res.json(note);
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user });
  res.json({ message: 'Note deleted' });
});

module.exports = router;


