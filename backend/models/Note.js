// const mongoose = require('mongoose');
// const NoteSchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { timestamps: true });
// module.exports = mongoose.model('Note', NoteSchema);

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tag: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
