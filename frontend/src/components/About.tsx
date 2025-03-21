import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FaLinkedin } from "react-icons/fa";

interface Leader {
  name: string;
  title: string;
  image: string;
  linkedin: string;
  description: string;
}

const leadershipTeam: Leader[] = [
  {
    name: "Gautam Kumar Singh",
    title: "CEO",
    image: "/images/gautam.jpg",
    linkedin: "https://www.linkedin.com/in/gautamkumar",
    description:
      "Gautam is an accomplished semiconductor professional with experience in IC and IP product design and business creation. He has held senior engineering positions at top semiconductor companies in India, driving product definition and business unit management for high-speed interconnect communication IPs. He holds an M.Sc (Engg) degree from IISc Bangalore and a B.Tech from IIT Varanasi. Gautam has been part of several successful semiconductor startups in India.",
  },
  {
    name: "Prasun Bhattacharyya",
    title: "CTO",
    image: "/images/prasun.jpg",
    linkedin: "https://www.linkedin.com/in/prasunbhattacharyya",
    description:
      "With two decades of experience, Prasun has led cutting-edge designs in top semiconductor companies. He was responsible for designing and productizing industry-leading RF transceivers, high-performance PLLs, ADCs, TIAs, and SERDES. He holds a B.E. in Electronics and Communication from IIEST, Shibpur, West Bengal, and was part of one of India’s most successful semiconductor startups.",
  },
  {
    name: "Abhra Bagchi",
    title: "Architect, Digital Design",
    image: "/images/abhra.jpg",
    linkedin: "https://www.linkedin.com/in/abhrabagchi",
    description:
      "Abhra has a rich and diverse experience in Digital Design. He has worked with Google, Qualcomm, and Intel after graduating from IISc with an M.Tech in Electronic Design and B.Tech from IIEST, Shibpur. He has contributed to Coherent Caches for GPUs, WiFi 6/6E PHY, Memory Controllers, and High-Speed IO.",
  },
  {
    name: "Shabaaz N Syed",
    title: "Director, Custom Layout",
    image: "/images/shabaaz.jpg",
    linkedin: "https://www.linkedin.com/in/shabaazsyed",
    description:
      "Shabaaz has extensive experience in custom layout and chip integration for complex SoCs and ICs. He previously worked with Maxlinear and Western Digital after earning his B.Tech in Electronics from SDM College of Engineering and Technology, Dharwad. His expertise includes multi-protocol SerDes, RF transceivers, and high-performance analog ICs.",
  },
];

const About = () => {
  return (
    <div className="w-screen min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* About Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        {/* Title Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white leading-normal">
          Delivering Custom IC Solutions from Concept to Success
        </h1>

        {/* Introduction */}
        <p className="text-lg text-center text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          FermionIC Design is a fabless semiconductor company developing IPs and chipsets for wireline and wireless communication systems.
          Our multiprotocol SERDES IP supports up to 32Gbps NRZ data-rate and meets electrical specifications of PCIe5, USB4, Ethernet, and JESD standards.
          FermionIC’s innovative SERDES architecture guarantees best-in-class latency across various nodes, multiple foundries, and protocols.
          Our upcoming Hybrid Beamformer IC enables miniaturization of phased-array active antenna systems for 5G, SATCOM, and Radar.
        </p>

        {/* Leadership Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">
            Leadership Team
          </h2>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {leadershipTeam.map((leader, index) => (
              <LeadershipCard key={index} leader={leader} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// LeadershipCard Component (Handles Show More / Show Less)
const LeadershipCard: React.FC<{ leader: Leader }> = ({ leader }) => {
  const [showMore, setShowMore] = useState(false);
  const shortText = leader.description.slice(0, 150) + "..."; // Show only first 150 characters

  return (
    <Card className="bg-gray-900 text-white border border-gray-700 p-6 rounded-lg shadow-lg">
      <CardHeader className="flex items-center space-x-4">
        <img
          src={leader.image}
          alt={leader.name}
          className="w-20 h-20 rounded-full border-2 border-gray-700 object-cover"
        />
        <div>
          <CardTitle className="text-xl font-semibold">{leader.name}</CardTitle>
          <p className="text-gray-400 text-sm">{leader.title}</p>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {showMore ? leader.description : shortText}
        </p>

        {/* Show More / Show Less Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-400 transition"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>

        {/* LinkedIn Icon */}
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-4 text-blue-500 hover:text-blue-400 transition"
        >
          <FaLinkedin size={20} className="mr-2" />
          Connect on LinkedIn
        </a>
      </CardContent>
    </Card>
  );
};

export default About;
