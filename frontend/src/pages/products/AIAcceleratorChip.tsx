"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const AIAcceleratorChip = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 text-center mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6 leading-relaxed pb-3">
          AI Accelerator Chip for Edge Computing
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          <span className="text-cyan-400 font-semibold">In-Memory Computing for Edge AI</span> with ultra-low power consumption
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8"
      >
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl p-8 relative overflow-hidden group">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
          </div>
          
          <div className="flex flex-col items-center space-y-8 relative z-10">

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-lg shadow-lg w-full max-w-2xl"
          >
            <motion.img
              src="/src/assets/AiAcceleratorChipForEdgeComputing.png"
              alt="AI Accelerator Chip for Edge Computing"
              className="w-full h-auto object-cover rounded-lg"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

            <div className="text-lg w-full max-w-4xl">
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 leading-relaxed pb-1">Overview</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our AI Accelerator Chip revolutionizes edge computing with its in-memory computing architecture, delivering unprecedented performance per watt for AI inference at the edge.
              </p>
              
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 leading-relaxed pb-1">Key Features</h3>
              <ul className="text-gray-300 space-y-3 list-disc list-inside mb-8">
                <li>In-memory computing architecture for ultra-low power consumption</li>
                <li>Optimized for edge AI inference workloads</li>
                <li>Minimized data movement for energy efficiency</li>
                <li>Support for common neural network operators</li>
                <li>Scalable architecture for various edge computing needs</li>
              </ul>

              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 leading-relaxed pb-1">Applications</h3>
              <ul className="text-gray-300 space-y-3 list-disc list-inside mb-8">
                <li>Edge AI inference for IoT devices</li>
                <li>Battery-powered smart devices</li>
                <li>On-device machine learning</li>
                <li>Privacy-preserving AI applications</li>
                <li>Real-time sensor data processing</li>
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/products">
                    <Button className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-gray-700 hover:to-gray-900">
                      Back to Products
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={() => navigate("/contact-us")}
                    className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700"
                  >
                    Contact for Inquiry
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Hover Effect Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AIAcceleratorChip;
