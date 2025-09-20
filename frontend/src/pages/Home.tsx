import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden">
      <SEO 
        title="SiktaSys - Advanced Semiconductor Solutions"
        description="Leading fabless semiconductor company developing cutting-edge IPs and chipsets for Edge Computing, AI acceleration, Power Management, and IoT applications."
        keywords="semiconductor, silicon IP, edge computing, AI accelerator, power management, SERDES, data converters, analog frontend, wireless communication, IoT"
      />
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center w-full">
        <Hero />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
