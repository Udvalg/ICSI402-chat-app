import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import "./index.css";
import { Login, Register, Home } from "./pages";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { signedUser } = useContext(AuthContext);
  const PrivateRoute = ({ children }) => {
    if (!signedUser) {
      return <Navigate to="/Login" />;
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          index
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
