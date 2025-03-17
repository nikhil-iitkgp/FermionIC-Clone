import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-black text-white px-6">
      {/* Animated Heading */}
      <motion.h1 
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Fermionic Clone
      </motion.h1>

      {/* Subheading */}
      <motion.p 
        className="text-lg text-gray-400 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Cutting-edge hardware & software solutions for AI computing.
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div 
        className="mt-6 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md">
          Get Started
        </button>
        <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md">
          Learn More
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
