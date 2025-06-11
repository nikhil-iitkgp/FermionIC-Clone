import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuFacebook, LuTwitter, LuLinkedin, LuGithub } from "react-icons/lu";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#1e1e1e] to-[#2b2b2b] text-white py-6 px-6  w-full max-w-[100vw] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wider">FERMIONIC</h2>
          <p className="text-gray-400 text-sm mt-1">
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
                className="relative group text-white hover:text-blue-400 transition duration-300"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
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
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
            <LuFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
            <LuTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
            <LuLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
            <LuGithub size={24} />
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
