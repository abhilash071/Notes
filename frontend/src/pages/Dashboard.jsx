// src/pages/Dashboard.jsx
// import { useEffect, useState, useContext } from "react";
// import axios from "@/api/axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AuthContext } from "@/context/AuthContext";

// export default function Dashboard() {
//   const { logout } = useContext(AuthContext);
//   const [notes, setNotes] = useState([]);
//   const [form, setForm] = useState({ title: "", content: "" });
//   const [editingId, setEditingId] = useState(null);

//   const fetchNotes = async () => {
//     try {
//       const res = await axios.get("/notes");
//       setNotes(res.data);
//     } catch (err) {
//       console.error("Fetch notes failed", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`/notes/${editingId}`, form);
//         setEditingId(null);
//       } else {
//         await axios.post("/notes", form);
//       }
//       setForm({ title: "", content: "" });
//       fetchNotes();
//     } catch (err) {
//       console.error("Save note error", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/notes/${id}`);
//       fetchNotes();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleEdit = (note) => {
//     setForm({ title: note.title, content: note.content });
//     setEditingId(note._id);
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-12 space-y-6 p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">📝 Your Notes</h1>
//         <Button onClick={logout}>Logout</Button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <Input
//           name="title"
//           placeholder="Note Title"
//           value={form.title}
//           onChange={handleChange}
//         />
//         <Input
//           name="content"
//           placeholder="Note Content"
//           value={form.content}
//           onChange={handleChange}
//         />
//         <Button type="submit" className="w-full">
//           {editingId ? "Update Note" : "Add Note"}
//         </Button>
//       </form>

//       <div className="space-y-4">
//         {notes.map((note) => (
//           <div key={note._id} className="p-4 border rounded-xl shadow-sm">
//             <h3 className="font-semibold">{note.title}</h3>
//             <p className="text-gray-600">{note.content}</p>
//             <div className="mt-2 flex gap-2">
//               <Button size="sm" onClick={() => handleEdit(note)}>Edit</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleDelete(note._id)}>Delete</Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Dashboard() {
//   const { token, logout } = useContext(AuthContext);
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");

//   const headers = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const fetchNotes = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/notes", headers);
//       setNotes(res.data);
//     } catch (err) {
//       console.error("Failed to fetch notes:", err);
//     }
//   };

//   const createNote = async () => {
//     if (!newNote.trim()) return;
//     try {
//       const res = await axios.post("http://localhost:5000/api/notes", { content: newNote }, headers);
//       setNotes([res.data, ...notes]);
//       setNewNote("");
//     } catch (err) {
//       console.error("Failed to add note:", err);
//     }
//   };

//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/notes/${id}`, headers);
//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">My Notes</h1>
//         <Button variant="destructive" onClick={logout}>Logout</Button>
//       </div>

//       <div className="flex gap-2 mb-4">
//         <Input
//           placeholder="Write a new note..."
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//         />
//         <Button onClick={createNote}>Add</Button>
//       </div>

//       {notes.length === 0 ? (
//         <p className="text-gray-500">No notes yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {notes.map((note) => (
//             <div
//               key={note._id}
//               className="p-4 bg-white rounded-xl shadow flex justify-between items-start"
//             >
//               <p>{note.content}</p>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => deleteNote(note._id)}
//               >
//                 🗑️
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react'
import axios from 'axios'
import FilterDropdown from "@/components/FilterDropdown";

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tag, setTag] = useState('')

  const token = localStorage.getItem('token')

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(res.data)
    } catch (err) {
      console.error('Error fetching notes:', err)
    }
  }

  const handleCreateOrUpdate = async () => {
    try {
      if (!title || !content) return
      setLoading(true)

      if (editingNoteId) {
        await axios.put(
          `http://localhost:5000/api/notes/${editingNoteId}`,
          { title, content, tag },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          'http://localhost:5000/api/notes',
          { title, content, tag },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      setTitle('')
      setContent('')
      setTag('')
      setEditingNoteId(null)
      fetchNotes()
    } catch (err) {
      console.error('Error saving note:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditNote = (note) => {
    setEditingNoteId(note._id)
    setTitle(note.title)
    setContent(note.content)
    setTag(note.tag || '')
  }

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchNotes()
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="bg-white p-4 rounded-2xl shadow mb-6 space-y-2">
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button onClick={handleCreateOrUpdate} disabled={loading}>
          {editingNoteId ? 'Update Note' : 'Add Note'}
        </Button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{note.title}</h2>
                  <p className="text-gray-600 mb-1">{note.content}</p>
                  {note.tag && <span className="text-xs bg-gray-200 rounded px-2 py-1">{note.tag}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleEditNote(note)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(note._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
{/* <div className="max-w-4xl mx-auto mt-6 px-4">
<div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Your Notes</h1>
  <FilterDropdown notes={notes} selectedTag={tag} onChange={setTag} />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {filtered.map(note => (
    <div key={note._id} className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-xl font-semibold">{note.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{note.tag}</p>
      <p className="mt-2">{note.content}</p>
    </div>
  ))}
</div>
</div>
);
} */}

