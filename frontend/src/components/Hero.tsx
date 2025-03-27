"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // For navigation icons
import { Button } from "../components/ui/button";

const slides = [
  {
    image:
      "https://static.wixstatic.com/media/ee7e9e_67e4e18d91774f0a80ff09a92ab81fee~mv2.jpeg/v1/fill/w_1899,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ee7e9e_67e4e18d91774f0a80ff09a92ab81fee~mv2.jpeg",
    title: "Quantum-Inspired AI Acceleration",
    description: "Revolutionizing AI with next-gen quantum-enhanced processing units.",
  },
  {
    image:
      "https://static.wixstatic.com/media/ee7e9e_44e900e195714f6083621527ed6fcc02~mv2.jpeg/v1/fill/w_1899,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ee7e9e_44e900e195714f6083621527ed6fcc02~mv2.jpeg",
    title: "Advanced Semiconductor Fabrication",
    description: "Pioneering nano-scale semiconductor manufacturing for ultra-fast computing.",
  },
  {
    image:
      "https://static.wixstatic.com/media/ee7e9e_ed1316d7fb5b4d1f87ba30b6c5414fa6~mv2.jpg/v1/fill/w_1365,h_719,al_c,q_85,enc_avif,quality_auto/ee7e9e_ed1316d7fb5b4d1f87ba30b6c5414fa6~mv2.jpg",
    title: "Optimized AI Workloads",
    description: "High-performance AI computation with energy-efficient hardware acceleration.",
  },
  {
    image:
      "https://static.wixstatic.com/media/ee7e9e_36eb1603ff5b4a809cf45479bcae6997~mv2.jpeg/v1/fill/w_1899,h_1000,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ee7e9e_36eb1603ff5b4a809cf45479bcae6997~mv2.jpeg",
    title: "AI-Driven Chip Design",
    description: "Redefining chip architecture with AI-powered design and automation.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto-change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to manually change slides
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center bg-black text-white w-full">
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          key={index}
          src={slides[index].image}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Animated Heading */}
        <motion.h1
          key={slides[index].title}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[index].title}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          key={slides[index].description}
          className="text-lg text-gray-300 mt-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {slides[index].description}
        </motion.p>
      </div>

      {/* Left & Right Navigation Buttons */}
      <Button
        className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black transition-all"
        onClick={prevSlide}
      >
        <FaChevronLeft size={30} />
      </Button>

      <Button
        className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black transition-all"
        onClick={nextSlide}
      >
        <FaChevronRight size={30} />
      </Button>

      {/* Slide Indicator Dots (Bottom) */}
      <div className="absolute bottom-6 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
