import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#F5F5F5] text-black py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // Update with the actual logo path
            alt="Fermionic Logo"
            className="h-10"
          />
          <h1 className="text-lg font-bold">FERMIONIC</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="btn-nav">Home</Link>
          <Link to="/products" className="btn-nav">Products</Link>
          <Link to="/silicon-ip" className="btn-nav">Silicon IP</Link>
          <Link to="/about" className="btn-nav">About Us</Link>
          <Link to="/careers" className="btn-nav">Careers</Link>
          <Link to="/contact" className="btn-nav">Contact Us</Link>
        </nav>

        {/* Mobile Menu Button (Optional) */}
        <div className="md:hidden">
          <button className="text-black">☰</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
