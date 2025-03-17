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
];

const Products = () => {
  return (
    <div className="container w-screen mx-auto  ">
      <Header />
      <section className="py-16 bg-black text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Our Products</h2>
          <p className="text-gray-400 mt-2">
            Explore cutting-edge AI solutions
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
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
