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
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", headers);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/notes", { content: newNote }, headers);
      setNotes([res.data, ...notes]);
      setNewNote("");
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, headers);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button variant="destructive" onClick={logout}>Logout</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button onClick={createNote}>Add</Button>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4 bg-white rounded-xl shadow flex justify-between items-start"
            >
              <p>{note.content}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNote(note._id)}
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
