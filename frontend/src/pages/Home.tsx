import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-screen mx-auto min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
