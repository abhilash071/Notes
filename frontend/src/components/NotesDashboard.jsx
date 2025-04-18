import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async () => {
    await axios.post('http://localhost:5000/api/notes', form, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    fetchNotes();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">My Notes</h1>
      <div className="mb-4">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>
      <ul>
        {notes.map(note => (
          <li key={note._id} className="border p-4 mb-2 rounded shadow">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesDashboard;