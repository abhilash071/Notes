import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard will come in next steps */}
      </Routes>
    </Router>
  );
}

export default App;
