// const express = require('express');
// const Note = require('../models/Note');
// const auth = require('../middleware/auth');  // Import auth middleware

// const router = express.Router();

// // @route   GET /api/notes
// // @desc    Get all notes for the authenticated user
// // @access  Private (Protected by auth middleware)
// router.get('/', auth, async (req, res) => {
//   try {
//     // Find notes that belong to the authenticated user
//     const notes = await Note.find({ user: req.user });
//     res.json(notes);  // Return notes as JSON
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   POST /api/notes
// // @desc    Create a new note for the authenticated user
// // @access  Private (Protected by auth middleware)
// router.post('/', auth, async (req, res) => {
//   const { title, content } = req.body;

//   // Validate incoming data
//   if (!title || !content) {
//     return res.status(400).json({ message: 'Please provide title and content' });
//   }

//   try {
//     // Create a new note and save to DB
//     const newNote = new Note({
//       title,
//       content,
//       user: req.user,  // Attach userId from the token
//     });

//     await newNote.save();  // Save the note to the database
//     res.status(201).json(newNote);  // Return the created note
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   PUT /api/notes/:id
// // @desc    Update an existing note for the authenticated user
// // @access  Private (Protected by auth middleware)
// router.put('/:id', auth, async (req, res) => {
//   const { title, content } = req.body;
  
//   // Validate incoming data
//   if (!title || !content) {
//     return res.status(400).json({ message: 'Please provide title and content' });
//   }

//   try {
//     // Find the note by ID and check if it belongs to the user
//     const note = await Note.findById(req.params.id);

//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }

//     if (note.user.toString() !== req.user) {
//       return res.status(401).json({ message: 'Not authorized to update this note' });
//     }

//     // Update the note
//     note.title = title;
//     note.content = content;

//     await note.save();  // Save the updated note
//     res.json(note);  // Return the updated note
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   DELETE /api/notes/:id
// // @desc    Delete an existing note for the authenticated user
// // @access  Private (Protected by auth middleware)
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     // Find the note by ID and check if it belongs to the user
//     const note = await Note.findById(req.params.id);

//     if (!note) {
//       return res.status(404).json({ message: 'Note not found' });
//     }

//     if (note.user.toString() !== req.user) {
//       return res.status(401).json({ message: 'Not authorized to delete this note' });
//     }

//     // Delete the note
//     await note.remove();
//     res.json({ message: 'Note removed' });  // Return success message
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, content, tag } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newNote = new Note({
      user: req.userId,
      title,
      content,
      tag: tag || '',
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating note' });
  }
});

// @route   GET /api/notes
// @desc    Get all notes for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, content, tag } = req.body;

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = title || note.title;
    note.content = content || note.content;
    note.tag = tag || '';

    const updated = await note.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating note' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});

module.exports = router;



