import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./components/Products";
import SiliconIp from "./pages/SiliconIP";
import About from "./components/About";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import CrystalOscillator from "./pages/products/CrystalOscillator";
import LowNoiseLDO from "./pages/products/LowNoiseLDO";
import RFBeamforming from "./pages/products/RFBeamforming";
import SignalIntegrity from "./pages/products/SignalIntegrity";
import "./index.css";
import "./App.css"; 

function App() {
  return (
    <Router basename="">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/crystal-oscillator" element={<CrystalOscillator />} />
        <Route path="/products/low-noise-ldo" element={<LowNoiseLDO />} />
        <Route path="/products/rf-beamforming" element={<RFBeamforming />} />
        <Route path="/products/signal-integrity" element={<SignalIntegrity />} />
        <Route path="/silicon-ip" element={<SiliconIp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
