import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuFacebook, LuTwitter, LuLinkedin, LuGithub } from "react-icons/lu";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/95 backdrop-blur-md text-white py-8 px-6 w-full max-w-[100vw] overflow-hidden border-t border-cyan-400/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-orbitron font-black tracking-widest logo-gradient">SIKTASYS</h2>
          <p className="text-gray-300 text-sm mt-2 font-rajdhani">
            © 2025 All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
          {[
            "Home",
            "Products",
            "Silicon IP",
            "About Us",
            "Careers",
            "Contact Us",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="relative group text-white hover:text-cyan-400 transition duration-300 font-rajdhani font-medium"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Icons */}
        <motion.div
          className="flex space-x-4 mt-4 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110">
            <LuFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110">
            <LuTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110">
            <LuLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110">
            <LuGithub size={24} />
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
