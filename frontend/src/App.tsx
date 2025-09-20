import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Products from "./components/Products";
import SiliconIp from "./pages/SiliconIP";
import About from "./components/About";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import AnalogFrontend from "./pages/products/AnalogFrontend";
import AIAcceleratorChip from "./pages/products/AIAcceleratorChip";
import DataConverters from "./pages/products/DataConverters";
import PowerManagementICs from "./pages/products/PowerManagementICs";
import CommunicationSoCs from "./pages/products/CommunicationSocs";
import WirelineCommunicationICs from "./pages/products/WirelineCommunicationICs";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/analog-frontend" element={<AnalogFrontend />} />
        <Route
          path="/products/ai-accelerator-chip"
          element={<AIAcceleratorChip />}
        />
        <Route path="/products/data-converters" element={<DataConverters />} />
        <Route
          path="/products/power-management-ics"
          element={<PowerManagementICs />}
        />
        <Route
          path="/products/communication-socs"
          element={<CommunicationSoCs />}
        />
        <Route
          path="/products/wireline-communication-ics"
          element={<WirelineCommunicationICs />}
        />
        <Route path="/silicon-ip" element={<SiliconIp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
