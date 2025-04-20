// src/pages/Home.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 text-center">
      <h1 className="text-4xl font-bold">🗒️ Notes App</h1>
      <p className="text-gray-600 max-w-sm">
        Welcome! Create and manage your personal notes securely.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/register")}>Get Started</Button>
        <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
      </div>
    </div>
  );
}
