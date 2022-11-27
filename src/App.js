import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";
import { Login } from "./pages/login/";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
