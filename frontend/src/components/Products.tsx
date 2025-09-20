"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const products = [
  {
    id: "communication-socs",
    title: "Communication SoC",
    description:
      "Multi-mode communication SoC for IoT applications - with RFiC, Baseband and Microprocessor.",
    image: "/images/CommunicationSocs.png",
    link: "/products/communication-socs",
  },
  {
    id: "power-management",
    title: "Power Management ICs",
    description:
      "Battery charging interface, Energy Harvesting, Power converters, LDO.",
    image: "/images/PowerManagementICs.png",
    link: "/products/power-management-ics",
  },
  {
    id: "analog-frontend",
    title: "Analog Frontend",
    description:
      "Analog frontend for sensor data acquisition in IoT devices.",
    image: "/images/AnalogFrontend.png",
    link: "/products/analog-frontend",
  },
  {
    id: "wireline-communication",
    title: "Wireline Communication ICs",
    description:
      "SERDES, CDR, Clock Synthesizer, Multi-Standard Transceivers, Equalizer, Encoder Decoders, BIST.",
    image: "/images/WirelineCommunicationICs.png",
    link: "/products/wireline-communication-ics",
  },
  {
    id: "ai-accelerator",
    title: "AI Accelerator Chip for Edge Computing",
    description:
      "In-memory computing accelerator for low power edge computing.",
    image: "/images/AiAcceleratorChipForEdgeComputing.png",
    link: "/products/ai-accelerator-chip",
  },
  {
    id: "data-converters",
    title: "Data Converters",
    description:
      "Data converters with a wide range of specifications and architectures for specific applications.",
    image: "/images/DataConverters.png",
    link: "/products/data-converters",
  },
];

const Products = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 text-center mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6 leading-relaxed pb-2">
          Our Products
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Explore our <span className="text-cyan-400 font-semibold">cutting-edge semiconductor solutions</span> designed for next-generation applications
        </p>
      </motion.div>

      {/* Enhanced Product Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="rounded-xl overflow-hidden h-full"
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl p-6 h-full flex flex-col relative overflow-hidden group hover:border-gray-600/70 transition-all duration-300">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
              </div>
              
              {/* Product Image */}
              <div className="w-full flex justify-center mb-6 relative z-10">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-40 object-contain rounded-lg shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                />
              </div>

              {/* Product Info */}
              <div className="text-center flex-grow relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  {product.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* View Details Button */}
              <div className="mt-auto relative z-10">
                <Link to={product.link}>
                  <Button className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700">
                    View Details
                  </Button>
                </Link>
              </div>
              
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
