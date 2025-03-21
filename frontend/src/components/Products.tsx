import ProductCard from "./ProductCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

const products = [
  {
    title: "Quantum AI Processor",
    description: "Next-gen quantum computing for AI workloads.",
    image: "https://source.unsplash.com/400x300/?quantum,processor",
  },
  {
    title: "Neural Network Accelerator",
    description: "Optimized hardware for deep learning models.",
    image: "https://source.unsplash.com/400x300/?ai,chip",
  },
  {
    title: "AI Software Suite",
    description: "Powerful tools for AI model training & deployment.",
    image: "https://source.unsplash.com/400x300/?software,code",
  },
  {
    title: "Edge AI Processor",
    description: "Efficient AI computing at the edge for real-time applications.",
    image: "https://source.unsplash.com/400x300/?edge,ai",
  },
  {
    title: "AI Model Compression Toolkit",
    description: "Optimized AI models for lower latency and power efficiency.",
    image: "https://source.unsplash.com/400x300/?ai,optimization",
  },
  {
    title: "AI Security Module",
    description: "Secure AI data processing with advanced cryptography.",
    image: "https://source.unsplash.com/400x300/?security,ai",
  }
];

const Products = () => {
  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      {/* Main Content */}
      <section className="flex flex-col items-center pt-24 pb-16 text-white w-full">
        {/* Title Section */}
        <div className="text-center w-full">
          <h2 className="text-4xl font-bold">Our Products</h2>
          <p className="text-gray-400 mt-2">Explore cutting-edge AI solutions</p>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-10 px-6 w-full max-w-7xl">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
