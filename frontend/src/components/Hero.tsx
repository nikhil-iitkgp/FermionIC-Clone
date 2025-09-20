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
    "SoC Integration",
  ];

  // Calculate positions for circular layout - responsive radius
  const radius = 200; // Base radius, will be scaled by CSS
  const centerAngle = Math.PI / 2; // Start from top
  const angleStep = (2 * Math.PI) / items.length;

  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center mt-4 md:mt-8 interactive-container">
      {/* CSS-based Arrow Lines */}
      {items.map((_item, index) => {
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        const arrowMultiplier = isMobile ? 1 : 1.5;
        const angle = centerAngle + index * angleStep;
        const x = Math.cos(angle) * arrowMultiplier * radius;
        const y = Math.sin(angle) * arrowMultiplier * radius;
        // Calculate arrow properties
        const arrowLength = Math.sqrt(x * x + y * y);
        const arrowAngle = (Math.atan2(y, x) * 180) / Math.PI;
        return (
          <motion.div
            key={`arrow-${index}`}
            className="absolute pointer-events-none h-[2px] md:h-[3px]"
            style={{
              width: `${arrowLength}px`,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
              borderRadius: "2px",
              transformOrigin: "left center",
              left: "50%",
              top: "50%",
              zIndex: 10,
            }}
            initial={{
              scaleX: 0,
              opacity: 0,
              rotate: arrowAngle,
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
              rotate: arrowAngle,
            }}
            transition={{
              duration: 1,
              delay: index * 0.2 + 0.5,
              ease: "easeOut",
            }}
          >
            {/* Arrow Head */}
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 md:border-l-[8px] md:border-t-[4px] md:border-b-[4px] md:-mr-2 border-l-[6px] border-t-[3px] border-b-[3px] -mr-1.5"
              style={{
                borderLeft: "8px solid rgba(255, 255, 255, 0.9)",
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                marginRight: "-8px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2 + 1.5,
                ease: "easeOut",
              }}
            />
          </motion.div>
        );
      })}

      {/* Center Title */}
      <motion.div
        className="absolute z-20 bg-black/80 backdrop-blur-lg rounded-xl px-4 md:px-8 py-3 md:py-6 border-2 border-cyan-400/50 shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-lg md:text-2xl lg:text-3xl font-orbitron font-bold text-white text-center drop-shadow-lg">
          Integrated Semiconductor Solutions
        </h2>
      </motion.div>

      {/* Circular Items */}
      {items.map((item, index) => {
        const isMobile =
          typeof window !== "undefined" && window.innerWidth < 768;
        const arrowMultiplier = isMobile ? 1 : 1.35;
        const angle = centerAngle + index * angleStep;
        const x = Math.cos(angle) * arrowMultiplier * radius;
        const y = Math.sin(angle) * arrowMultiplier * radius;
        return (
          <motion.div
            key={item}
            className="absolute bg-black/90 backdrop-blur-lg rounded-xl px-3 md:px-6 py-2 md:py-4 border-2 border-cyan-400/60 shadow-2xl w-[140px] md:w-[200px]"
            style={{
              textAlign: "center",
              zIndex: 15,
            }}
            initial={{
              scale: 0,
              opacity: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: x,
              y: y,
            }}
            transition={{
              duration: 1.25,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.15,
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              borderColor: "rgba(0, 212, 255, 0.8)",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 212, 255, 0.3)",
            }}
          >
            <div className="text-xs md:text-base font-rajdhani font-semibold text-white leading-tight drop-shadow-lg">
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
    description:
      "Comprehensive semiconductor integration featuring analog mixed-signal modules, power management, radio frequency, AI acceleration, and SoC integration.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isHeld, setIsHeld] = useState(false);

  // Auto-change slides with different intervals (only when not held)
  useEffect(() => {
    if (isHeld) return;

    const getSlideDelay = (slideIndex: number) => {
      return slideIndex === 3 ? 10000 : 3000; // 10 seconds for slide 4, 3 seconds for others
    };

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, getSlideDelay(index));

    return () => clearTimeout(timer);
  }, [index, isHeld]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextSlide();
          break;
        case " ": // Spacebar - hold slide
          event.preventDefault();
          setIsHeld(true);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        setIsHeld(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Function to manually change slides
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] h-screen flex flex-col justify-center items-center text-center bg-black text-white w-full overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center px-2 xs:px-4 sm:px-6 md:px-8 lg:px-12">
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
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-orbitron font-black text-white drop-shadow-2xl bg-black/30 backdrop-blur-sm px-2 xs:px-4 sm:px-8 md:px-10 lg:px-12 py-2 xs:py-3 md:py-4 rounded-xl border border-cyan-400/30 max-w-[90vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {slides[index].title}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              key={slides[index].description}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-rajdhani font-medium text-white mt-2 xs:mt-3 sm:mt-4 md:mt-6 max-w-[90vw] xs:max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-black/40 backdrop-blur-sm px-2 xs:px-3 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-lg border border-cyan-400/20 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {slides[index].description}
            </motion.p>
          </>
        )}
      </div>

      {/* Enhanced Left Navigation Button */}
      <Button
        className="absolute left-2 sm:left-4 md:left-6 lg:left-10 top-1/2 transform -translate-y-1/2 
            text-white bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-md 
            border border-cyan-400/30 hover:border-cyan-400/60 
            p-2 sm:p-3 md:p-4 rounded-full 
            hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-black/60 
            hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 
            transition-all duration-300 ease-in-out 
            z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
            flex items-center justify-center group"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="text-white group-hover:text-cyan-300 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl" />
      </Button>

      {/* Enhanced Right Navigation Button */}
      <Button
        className="absolute right-2 sm:right-4 md:right-6 lg:right-10 top-1/2 transform -translate-y-1/2 
            text-white bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-md 
            border border-cyan-400/30 hover:border-cyan-400/60 
            p-2 sm:p-3 md:p-4 rounded-full 
            hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-black/60 
            hover:shadow-lg hover:shadow-cyan-400/20 hover:scale-105 
            transition-all duration-300 ease-in-out 
            z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
            flex items-center justify-center group"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-white group-hover:text-cyan-300 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl" />
      </Button>

      {/* Clean Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 flex justify-center w-full px-4">
        <div className="flex space-x-3">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                i === index
                  ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                  : "bg-gray-400/60 hover:bg-gray-300/80"
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;