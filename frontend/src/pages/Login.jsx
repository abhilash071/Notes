// src/pages/Login.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 rounded-2xl shadow-xl bg-white space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}
