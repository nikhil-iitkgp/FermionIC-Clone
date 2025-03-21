import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./components/Products";
import SiliconIp from "./pages/SiliconIP";
import About from "./components/About";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import "./index.css";
import "./App.css"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/silicon-ip" element={<SiliconIp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
