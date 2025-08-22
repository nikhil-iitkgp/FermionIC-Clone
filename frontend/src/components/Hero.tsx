"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // For navigation icons
import { Button } from "../components/ui/button";

// Import images
import advancedSiliconIP from "../assets/Advanced Silicon IP.jpg";
import semiconductorInnovation from "../assets/semiconductor Product Innovation.jpg";
import applicationSoCs from "../assets/Application Specific SoCs.jpg";
import integratedSolutions from "../assets/Integrated Semiconductor Solution.jpg";

// Interactive items for slide 4
const InteractiveItems = () => {
  const items = [
    "Analog Mixed Signal Modules",
    "Power Management",
    "Radio",
    "AI Accelerator",
    "SoC Integration"
  ];

  // Calculate positions for circular layout
  const radius = 200; // Distance from center
  const centerAngle = Math.PI / 2; // Start from top
  const angleStep = (2 * Math.PI) / items.length;

         return (
     <div className="relative w-full h-96 flex items-center justify-center mt-8">
       {/* CSS-based Arrow Lines */}
       {items.map((item, index) => {
         const angle = centerAngle + index * angleStep;
         const x = Math.cos(angle) * 1.5 * radius;
         const y = Math.sin(angle) * 1.5 * radius;
         
         // Calculate arrow properties
         const arrowLength = Math.sqrt(x * x + y * y);
         const arrowAngle = Math.atan2(y, x) * 180 / Math.PI;
         
         return (
           <motion.div
             key={`arrow-${index}`}
             className="absolute pointer-events-none"
             style={{
               width: `${arrowLength}px`,
               height: '3px',
               background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
               borderRadius: '2px',
               transformOrigin: 'left center',
               left: '50%',
               top: '50%',
               zIndex: 10
             }}
             initial={{ 
               scaleX: 0, 
               opacity: 0,
               rotate: arrowAngle
             }}
             animate={{ 
               scaleX: 1, 
               opacity: 1,
               rotate: arrowAngle
             }}
             transition={{
               duration: 1,
               delay: index * 0.2 + 0.5,
               ease: "easeOut"
             }}
           >
             {/* Arrow Head */}
             <motion.div
               className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0"
               style={{
                 borderLeft: '8px solid rgba(255, 255, 255, 0.9)',
                 borderTop: '4px solid transparent',
                 borderBottom: '4px solid transparent',
                 marginRight: '-8px'
               }}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{
                 duration: 0.5,
                 delay: index * 0.2 + 1.5,
                 ease: "easeOut"
               }}
             />
           </motion.div>
         );
       })}

      {/* Center Title */}
      <motion.div
        className="absolute z-20 bg-black/80 backdrop-blur-lg rounded-xl px-8 py-6 border-2 border-cyan-400/50 shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white text-center drop-shadow-lg">
          Integrated Semiconductor Solutions
        </h3>
      </motion.div>

      {/* Circular Items */}
      {items.map((item, index) => {
        const angle = centerAngle + index * angleStep;
        const x = Math.cos(angle) * 1.5*radius;
        const y = Math.sin(angle) * 1.5*radius;

        return (
          <motion.div
            key={item}
            className="absolute bg-black/90 backdrop-blur-lg rounded-xl px-6 py-4 border-2 border-cyan-400/60 shadow-2xl"
            style={{
              width: '200px',
              textAlign: 'center',
              zIndex: 15
            }}
            initial={{ 
              scale: 0, 
              opacity: 0,
              x: 0,
              y: 0
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              x: x,
              y: y
            }}
            transition={{
              duration: 1.25,
              delay: index * 0.2,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.15,
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              borderColor: "rgba(0, 212, 255, 0.8)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 212, 255, 0.3)"
            }}
          >
            <div className="text-base font-rajdhani font-semibold text-white leading-tight drop-shadow-lg">
              {item}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const slides = [
  {
    image: advancedSiliconIP,
    title: "Advanced Silicon IPs",
    description:
      "Cutting-edge intellectual property cores for next-generation semiconductor designs.",
  },
  {
    image: semiconductorInnovation,
    title: "Semiconductor Product Innovation",
    description:
      "Pioneering breakthrough semiconductor solutions for tomorrow's technology challenges.",
  },
  {
    image: applicationSoCs,
    title: "Application Specific SoCs",
    description:
      "Custom system-on-chip solutions tailored for specific application requirements.",
  },
  {
    image: integratedSolutions,
    title: "Integrated Semiconductor Solutions",
    description:"Comprehensive semiconductor integration featuring analog mixed-signal modules, power management, radio frequency, AI acceleration, and SoC integration.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto-change slides with different intervals
  useEffect(() => {
    const getSlideDelay = (slideIndex: number) => {
      return slideIndex === 3 ? 10000 : 3000; // 10 seconds for slide 4, 3 seconds for others
    };

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, getSlideDelay(index));

    return () => clearTimeout(timer);
  }, [index]);

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
        {/* For Slide 4, show only the interactive items */}
        {index === 3 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full"
          >
            <InteractiveItems />
          </motion.div>
        ) : (
          <>
            {/* Animated Heading */}
            <motion.h1
              key={slides[index].title}
              className="text-4xl md:text-6xl font-orbitron font-black text-white drop-shadow-2xl bg-black/30 backdrop-blur-sm px-8 py-4 rounded-xl border border-cyan-400/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {slides[index].title}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              key={slides[index].description}
              className="text-lg font-rajdhani font-medium text-white mt-6 max-w-3xl bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyan-400/20 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {slides[index].description}
            </motion.p>
          </>
        )}
      </div>

      {/* Left Navigation Button */}
      <Button
        className="absolute left-2 md:left-10 top-1/2 transform -translate-y-1/2 
            text-white bg-black/50 p-4 md:p-3 rounded-full hover:bg-black transition-all 
            z-20 w-12 h-12 flex items-center justify-center"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <FaChevronLeft size={24} />
      </Button>

      {/* Right Navigation Button */}
      <Button
        className="absolute right-2 md:right-10 top-1/2 transform -translate-y-1/2 
            text-white bg-black/50 p-4 md:p-3 rounded-full hover:bg-black transition-all 
            z-20 w-12 h-12 flex items-center justify-center"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <FaChevronRight size={24} />
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
