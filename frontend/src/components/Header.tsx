import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black/95 backdrop-blur-md text-white py-4 px-6 shadow-lg fixed top-0 left-0 right-0 w-full z-50 border-b border-cyan-400/20">
      <div className="w-full flex justify-between items-center max-w-[100vw] px-4 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-orbitron font-black tracking-widest logo-gradient logo-hover">
            SIKTASYS
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["Home", "Products", "Silicon IP", "About Us", "Careers", "Contact Us"].map(
            (item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="relative group text-lg"
              >
                <span className="btn-nav font-rajdhani font-medium">{item}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            ></motion.div>

            {/* Slide-down Mobile Menu */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md shadow-lg z-50 p-6 pb-10 border-b border-cyan-400/20"
            >
              {/* Close Button */}
              <Button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                <X size={28} />
              </Button>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6 items-center mt-12 text-center">
                {["Home", "Products", "Silicon IP", "About Us", "Careers", "Contact Us"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-lg font-rajdhani font-semibold hover:text-cyan-400 transition duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  )
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
