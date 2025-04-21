// import { useState, useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       login(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
//         <Button type="submit" className="w-full">Login</Button>
//         <p className="text-sm mt-4 text-center">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', data)
      localStorage.setItem('token', res.data.token)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-xl" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded-xl" />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-xl w-full hover:bg-blue-700">Login</button>
      </form>
    </div>
  )
}
