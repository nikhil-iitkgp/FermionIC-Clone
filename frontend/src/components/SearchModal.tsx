import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: "page" | "product" | "feature";
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  isMobile?: boolean;
  inputWidth?: string;
}

const SearchModal = ({
  isOpen,
  onClose,
  query,
  onQueryChange,
  isMobile = false,
  inputWidth = "w-full",
}: SearchModalProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Search data - in a real app, this would come from an API
  const searchData: SearchResult[] = [
    {
      title: "AI Accelerator Chip",
      description:
        "In-memory computing accelerator for low power edge computing applications",
      url: "/products/ai-accelerator-chip",
      type: "product",
    },
    {
      title: "Power Management ICs",
      description:
        "LDOs, Digital LDOs, Switched Capacitor DC-DC Converters, Energy Harvesting Units",
      url: "/products/power-management-ics",
      type: "product",
    },
    {
      title: "Data Converters",
      description:
        "Pipeline ADC, SAR ADC, Delta Sigma ADC with 8 to 16 bits ENOB",
      url: "/products/data-converters",
      type: "product",
    },
    {
      title: "Analog Frontend",
      description:
        "Signal Acquisition and Conditioning Units for sensor data acquisition",
      url: "/products/analog-frontend",
      type: "product",
    },
    {
      title: "Communication SoCs",
      description:
        "Multi-mode communication SoC for IoT applications with RFiC and Baseband",
      url: "/products/communication-socs",
      type: "product",
    },
    {
      title: "Wireline Communication ICs",
      description:
        "SERDES, CDR, Clock Synthesizer, Multi-Standard Transceivers",
      url: "/products/wireline-communication-ics",
      type: "product",
    },
    {
      title: "Silicon IP Portfolio",
      description:
        "Advanced Silicon IPs including SERDES, Power Management, and AI Accelerators",
      url: "/silicon-ip",
      type: "page",
    },
    {
      title: "About SiktaSys",
      description: "Learn about our team, mission, and semiconductor expertise",
      url: "/about-us",
      type: "page",
    },
    {
      title: "Careers",
      description: "Join our team of semiconductor experts and engineers",
      url: "/careers",
      type: "page",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our semiconductor solutions team",
      url: "/contact-us",
      type: "page",
    },
    {
      title: "Edge Computing",
      description:
        "Specialized semiconductor solutions for edge computing applications",
      url: "/products",
      type: "feature",
    },
    {
      title: "IoT Solutions",
      description: "Semiconductor IPs optimized for Internet of Things devices",
      url: "/products",
      type: "feature",
    },
  ];

  // Perform search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    if (query.trim().length < 2) {
      // Show popular/recent searches or suggestions for short queries
      const popularResults = searchData.slice(0, 4);
      setResults(popularResults);
      setSelectedIndex(-1);
      return;
    }

    setIsSearching(true);
    setSelectedIndex(-1);

    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const filteredResults = searchData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8); // Limit to 8 results

      setResults(filteredResults);
      setIsSearching(false);
    }, 200); // Reduced delay for better UX

    return () => clearTimeout(searchTimeout);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            const selectedResult = results[selectedIndex];
            window.location.href = selectedResult.url;
            handleResultClick();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);

      // Only prevent body scroll on mobile, not desktop
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (isMobile) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, onClose, results, selectedIndex, isMobile]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "page":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "feature":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleResultClick = () => {
    onClose();
    onQueryChange("");
    setResults([]);
  };

  // Handle scroll within the search results container
  const handleSearchScroll = (e: React.WheelEvent) => {
    // Always stop propagation to prevent main page scroll
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    if (!target) return;

    // Don't prevent default to avoid passive event listener errors
    // Let the browser handle scrolling naturally within the container
  };

  // Handle touch scrolling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow touch scrolling to work properly
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? 20 : -10 }}
          transition={{ duration: 0.2 }}
          className={
            isMobile
              ? "w-full px-0"
              : `absolute top-full left-0 mt-2 z-[9999] min-w-[280px] max-w-[85vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${inputWidth}`
          }
        >
          {/* Dropdown Container */}
          <div
            className={`bg-gradient-to-br from-gray-950/98 via-gray-900/98 to-gray-800/98 backdrop-blur-md border border-cyan-400/40 rounded-lg shadow-2xl overflow-hidden w-full ${
              isMobile
                ? "max-h-[calc(100vh-120px)]"
                : "max-h-[350px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]"
            }`}
          >
            {/* Search Results */}
            <div
              className={`overflow-y-auto search-dropdown-scroll search-results-container ${
                isMobile ? "search-results-mobile" : "search-results-desktop"
              }`}
              onWheel={handleSearchScroll}
              onTouchStart={handleTouchStart}
            >
              {isSearching && (
                <div className="p-6 text-center">
                  <div className="animate-spin w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-gray-400 text-sm">Searching...</p>
                </div>
              )}

              {!isSearching &&
                query.trim().length >= 2 &&
                results.length === 0 && (
                  <div className="p-6 text-center">
                    <Search className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">
                      No results found for "{query}"
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Try searching for products, features, or pages
                    </p>
                  </div>
                )}

              {!isSearching && results.length > 0 && (
                <div className="py-2">
                  {results.map((result, index) => (
                    <Link
                      key={index}
                      to={result.url}
                      onClick={handleResultClick}
                      className={`block px-4 py-3 transition-colors duration-200 group border-b border-gray-700/30 last:border-b-0 ${
                        selectedIndex === index
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/40"
                          : "hover:bg-gradient-to-r hover:from-gray-700/40 hover:to-gray-600/40"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors text-sm truncate">
                              {result.title}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full border flex-shrink-0 ${getTypeColor(
                                result.type
                              )}`}
                            >
                              {result.type}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        <ExternalLink
                          className="text-gray-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0"
                          size={12}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.trim().length === 0 && (
                <div className="p-6 text-center">
                  <Search className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">
                    Start typing to search
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Search for products, pages, and features
                  </p>
                </div>
              )}

              {query.trim().length === 1 && results.length > 0 && (
                <>
                  <div className="px-4 py-2 border-b border-gray-700/30">
                    <p className="text-xs text-gray-500">Popular searches</p>
                  </div>
                  <div className="py-2">
                    {results.map((result, index) => (
                      <Link
                        key={index}
                        to={result.url}
                        onClick={handleResultClick}
                        className={`block px-4 py-3 transition-colors duration-200 group border-b border-gray-700/30 last:border-b-0 ${
                          selectedIndex === index
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/40"
                            : "hover:bg-gradient-to-r hover:from-gray-700/40 hover:to-gray-600/40"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors text-sm truncate">
                                {result.title}
                              </h3>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full border flex-shrink-0 ${getTypeColor(
                                  result.type
                                )}`}
                              >
                                {result.type}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                              {result.description}
                            </p>
                          </div>
                          <ExternalLink
                            className="text-gray-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0"
                            size={12}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
