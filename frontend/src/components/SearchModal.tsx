import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'page' | 'product' | 'feature';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search data - in a real app, this would come from an API
  const searchData: SearchResult[] = [
    {
      title: "AI Accelerator Chip",
      description: "In-memory computing accelerator for low power edge computing applications",
      url: "/products/ai-accelerator-chip",
      type: "product"
    },
    {
      title: "Power Management ICs",
      description: "LDOs, Digital LDOs, Switched Capacitor DC-DC Converters, Energy Harvesting Units",
      url: "/products/power-management-ics",
      type: "product"
    },
    {
      title: "Data Converters",
      description: "Pipeline ADC, SAR ADC, Delta Sigma ADC with 8 to 16 bits ENOB",
      url: "/products/data-converters",
      type: "product"
    },
    {
      title: "Analog Frontend",
      description: "Signal Acquisition and Conditioning Units for sensor data acquisition",
      url: "/products/analog-frontend",
      type: "product"
    },
    {
      title: "Communication SoCs",
      description: "Multi-mode communication SoC for IoT applications with RFiC and Baseband",
      url: "/products/communication-socs",
      type: "product"
    },
    {
      title: "Wireline Communication ICs",
      description: "SERDES, CDR, Clock Synthesizer, Multi-Standard Transceivers",
      url: "/products/wireline-communication-ics",
      type: "product"
    },
    {
      title: "Silicon IP Portfolio",
      description: "Advanced Silicon IPs including SERDES, Power Management, and AI Accelerators",
      url: "/silicon-ip",
      type: "page"
    },
    {
      title: "About SiktaSys",
      description: "Learn about our team, mission, and semiconductor expertise",
      url: "/about-us",
      type: "page"
    },
    {
      title: "Careers",
      description: "Join our team of semiconductor experts and engineers",
      url: "/careers",
      type: "page"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our semiconductor solutions team",
      url: "/contact-us",
      type: "page"
    },
    {
      title: "Edge Computing",
      description: "Specialized semiconductor solutions for edge computing applications",
      url: "/products",
      type: "feature"
    },
    {
      title: "IoT Solutions",
      description: "Semiconductor IPs optimized for Internet of Things devices",
      url: "/products",
      type: "feature"
    }
  ];

  // Perform search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'page': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'feature': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleResultClick = () => {
    onClose();
    setQuery("");
    setResults([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Header */}
              <div className="flex items-center p-4 border-b border-gray-700/50">
                <Search className="text-gray-400 mr-3" size={20} />
                <Input
                  type="text"
                  placeholder="Search products, pages, and features..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 text-lg"
                  autoFocus
                />
                <Button
                  onClick={onClose}
                  className="ml-2 p-2 hover:bg-gray-700/50 bg-transparent"
                >
                  <X size={20} className="text-gray-400" />
                </Button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {isSearching && (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-400">Searching...</p>
                  </div>
                )}

                {!isSearching && query.trim().length >= 2 && results.length === 0 && (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No results found for "{query}"</p>
                    <p className="text-gray-500 text-sm mt-2">Try searching for products, features, or pages</p>
                  </div>
                )}

                {!isSearching && results.length > 0 && (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <Link
                        key={index}
                        to={result.url}
                        onClick={handleResultClick}
                        className="block p-4 hover:bg-gray-700/30 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                                {result.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(result.type)}`}>
                                {result.type}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {result.description}
                            </p>
                          </div>
                          <ExternalLink className="text-gray-500 group-hover:text-cyan-400 transition-colors ml-2 flex-shrink-0" size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {query.trim().length < 2 && (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Start typing to search</p>
                    <p className="text-gray-500 text-sm mt-2">Search for products, pages, and features</p>
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="p-3 border-t border-gray-700/50 bg-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press ESC to close</span>
                  <span>{results.length > 0 ? `${results.length} results` : ''}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
