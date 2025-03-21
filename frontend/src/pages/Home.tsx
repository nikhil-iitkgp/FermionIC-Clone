import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
