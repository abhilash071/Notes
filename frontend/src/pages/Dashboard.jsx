// src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from "react";
import axios from "@/api/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch notes failed", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/notes/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("/notes", form);
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error("Save note error", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 Your Notes</h1>
        <Button onClick={logout}>Logout</Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name="title"
          placeholder="Note Title"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          name="content"
          placeholder="Note Content"
          value={form.content}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">
          {editingId ? "Update Note" : "Add Note"}
        </Button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note._id} className="p-4 border rounded-xl shadow-sm">
            <h3 className="font-semibold">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={() => handleEdit(note)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(note._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
