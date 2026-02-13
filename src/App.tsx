import Register from "./pages/Register";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import Login from "./pages/Login";
import { Routes, Route } from "react-router";
import Landing from "./pages/Landing";


const App = () => {
  return (
    <div className="bg">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
