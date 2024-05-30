import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setRole("USER")} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<Home role={role} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
