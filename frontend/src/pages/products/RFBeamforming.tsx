"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const RFBeamforming = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <Header />

      {/* Product Details Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="w-full max-w-7xl mx-auto px-6 py-6 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 mt-36 mb-20"
      >
        <div className="flex flex-col items-center space-y-8">
          {/* Product Title and Tagline */}
          <motion.div className="text-center">
            <h2 className="text-5xl mt-2 font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              RF Beamforming IC
            </h2>
            <p className="text-blue-400 uppercase text-sm font-semibold tracking-wide mt-6 mb-6">
              Low-Power, High-Linearity Quad RX/TX Path for Beamforming
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-lg shadow-lg w-full max-w-2xl"
          >
            <motion.img
              src="https://static.wixstatic.com/media/ee7e9e_231910cbbf6c4b419fe61ed62ebae8a2~mv2.png/v1/fill/w_1200,h_654,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/RF_IC.png"
              alt="RF Beamforming IC"
              className="w-full h-auto object-cover rounded-lg"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Text Content */}
          <div className="text-lg w-full max-w-4xl">
            <h3 className="text-3xl font-bold text-white mb-4">Features</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>6-10.5 GHz operation</li>
              <li>
                Supports 4-antennas, each multiplexed between Tx and RX in TDD
                mode
              </li>
              <li>Fast beam steering</li>
              <li>Fast TDD switching</li>
              <li>4-wire SPI interface</li>
              <li>Supply Voltage: 3.3V</li>
              <li>Temperature Range: 0°C to 70°C</li>
            </ul>

            <h3 className="text-3xl font-bold text-white mt-6">Applications</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside mb-8">
              <li>Commercial and Weather Radars</li>
              <li>5G Communications</li>
            </ul>

            {/* Updated Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              {/* Back to Products Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-gray-600 hover:to-gray-800">
                    Back to Products
                  </Button>
                </Link>
              </motion.div>

              {/* Contact for Inquiry Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => navigate("/contact-us")}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-800"
                >
                  Contact for Inquiry
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default RFBeamforming;
