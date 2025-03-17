import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <div>
          <h2 className="text-2xl font-bold">Fermionic Clone</h2>
          <p className="text-gray-400 text-sm">© 2025 All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/products" className="hover:text-gray-400">Products</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
