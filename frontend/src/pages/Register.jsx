// import { useState, useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Register() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", form);
//       login(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//         <Input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="mb-3"
//         />
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="mb-3"
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="mb-3"
//         />
//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//         <Button type="submit" className="w-full">Register</Button>
//         <p className="text-sm mt-4 text-center">
//           Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register', data)
      localStorage.setItem('token', res.data.token)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Register</h1>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded-xl" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-xl" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded-xl" />
        <button className="bg-green-600 text-white py-2 px-4 rounded-xl w-full hover:bg-green-700">Register</button>
      </form>
    </div>
  )
}
