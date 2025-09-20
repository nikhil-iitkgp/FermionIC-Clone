import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-black/95 backdrop-blur-md text-white py-4 px-6 shadow-lg fixed top-0 left-0 right-0 w-full z-50 border-b border-cyan-400/20">
      <div className="w-full flex justify-between items-center max-w-[100vw] px-4 md:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-orbitron font-black tracking-widest logo-gradient logo-hover">
            SIKTASYS
          </h1>
        </Link>

        {/* Desktop and Tablet Navigation - Search visible on md+ */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Input */}
          <div className="relative" ref={searchContainerRef}>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 pointer-events-none z-10"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search products, pages..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(e.target.value.length > 0 || true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="pl-11 pr-10 py-2 w-40 sm:w-44 md:w-48 lg:w-56 xl:w-64 2xl:w-72 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-lg transition-all duration-300 shadow-lg relative z-0"
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label="Clear search"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}

            {/* Search Modal positioned relative to search input */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              inputWidth="w-40 sm:w-44 md:w-48 lg:w-56 xl:w-64 2xl:w-72"
            />
          </div>

          {/* Desktop Navigation Menu - hidden on tablet */}
          <nav className="hidden lg:flex space-x-6">
            {[
              "Home",
              "Products",
              "Silicon IP",
              "About Us",
              "Careers",
              "Contact Us",
            ].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                className="relative group text-lg"
              >
                <span className="btn-nav font-rajdhani font-medium">
                  {item}
                </span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Tablet Menu Button - shows between md and lg */}
        <div className="hidden md:flex lg:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile - Search Icon Button and Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 sm:p-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300"
            aria-label="Search"
          >
            <Search size={20} className="text-cyan-400" />
          </Button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search Modal - only show on mobile */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
            >
              <div className="p-2">
                <div className="flex items-center mb-2">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 pointer-events-none z-10"
                      size={18}
                    />
                    <Input
                      type="text"
                      placeholder="Search products, pages..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                      }}
                      autoFocus
                      className="pl-11 pr-12 py-3 w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/60 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 rounded-lg transition-all duration-300 shadow-lg text-base relative z-0"
                    />
                    {/* Close button integrated in input */}
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-1 rounded-full hover:bg-gray-700/50"
                      aria-label="Close search"
                      title="Close search"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Mobile Search Results */}
                <SearchModal
                  isOpen={true}
                  onClose={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  isMobile={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                {[
                  "Home",
                  "Products",
                  "Silicon IP",
                  "About Us",
                  "Careers",
                  "Contact Us",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-lg font-rajdhani font-semibold hover:text-cyan-400 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
