"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const products = [
  {
    id: "crystal-oscillator",
    title: "Crystal Oscillator Driver",
    description:
      "High-frequency support up to 32MHz with excellent phase noise performance.",
    image:
      "https://static.wixstatic.com/media/ee7e9e_b3a893e939584d708bcb0b21c7c63aff~mv2.png/v1/fill/w_720,h_572,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/application_XTAL.png",
    link: "/products/crystal-oscillator",
  },
  {
    id: "low-noise-ldo",
    title: "Low Noise LDO ICs",
    description:
      "Low-noise, high-PSRR LDO ICs for imaging, radar, and field instrumentation.",
    image:
      "https://static.wixstatic.com/media/ee7e9e_8bb1fe73c1fd403ba1e13dca804c9cb9~mv2.png/v1/fill/w_938,h_534,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/application_ldo.png",
    link: "/products/low-noise-ldo",
  },
  {
    id: "rf-beamforming",
    title: "RF Beamforming IC",
    description:
      "Quad RX/TX path IC with gain and phase control for 5G & Radar applications.",
    image:
      "https://static.wixstatic.com/media/ee7e9e_231910cbbf6c4b419fe61ed62ebae8a2~mv2.png/v1/fill/w_1200,h_654,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/RF_IC.png",
    link: "/products/rf-beamforming",
  },
  {
    id: "signal-integrity",
    title: "Signal Integrity ICs",
    description:
      "High-speed ReDrivers and Repeaters for enhanced signal transmission integrity.",
    image:
      "https://static.wixstatic.com/media/ee7e9e_3b4106ac1dd64578a8cf6e9094a605b9~mv2.png/v1/fill/w_1633,h_321,al_c,q_90,enc_avif,quality_auto/Redriver_use.png",
    link: "/products/signal-integrity",
  },
];

const Products = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <Header />

      {/* Page Title Section */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-24 pb-8"
      >
        <h2 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Our Products
        </h2>
        <p className="text-blue-400 uppercase text-sm font-semibold tracking-wide mt-4">
          Explore cutting-edge semiconductor solutions
        </p>
      </motion.section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 pb-20 w-full max-w-7xl mx-auto">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.1)",
            }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            {/* Product Image */}
            <div className="w-full flex justify-center">
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain rounded-md"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Product Info */}
            <div className="text-center mt-6">
              <h3 className="text-2xl font-semibold text-white">
                {product.title}
              </h3>
              <p className="text-gray-400 mt-2">{product.description}</p>
            </div>

            {/* View Details Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <Link to={product.link}>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-800">
                  View Details
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
