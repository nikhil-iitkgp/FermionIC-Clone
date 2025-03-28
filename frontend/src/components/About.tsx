"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

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
    image: "https://static.wixstatic.com/media/3a7a0a_8e80e06480284ca9999f71029d42844e~mv2.jpg/v1/crop/x_323,y_143,w_860,h_865/fill/w_432,h_434,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/gautam_da.jpg",
    linkedin: "https://www.linkedin.com/in/gautamkumar",
    description:
      "Gautam is an accomplished semiconductor professional with experience in IC and IP product design and business creation. He has held senior engineering positions at top semiconductor companies in India, driving product definition and business unit management for high-speed interconnect communication IPs. He holds an M.Sc (Engg) degree from IISc Bangalore and a B.Tech from IIT Varanasi. Gautam has been part of several successful semiconductor startups in India.",
  },
  {
    name: "Prasun Bhattacharyya",
    title: "CTO",
    image: "https://static.wixstatic.com/media/3a7a0a_c83fa5a5cb4143dcaa4cc9b7dc7d9ef3~mv2.jpg/v1/crop/x_0,y_0,w_791,h_794/fill/w_432,h_434,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/prasun_da.jpg",
    linkedin: "https://www.linkedin.com/in/prasunbhattacharyya",
    description:
      "With two decades of experience, Prasun has led cutting-edge designs in top semiconductor companies. He was responsible for designing and productizing industry-leading RF transceivers, high-performance PLLs, ADCs, TIAs, and SERDES. He holds a B.E. in Electronics and Communication from IIEST, Shibpur, West Bengal, and was part of one of India’s most successful semiconductor startups.",
  },
  {
    name: "Abhra Bagchi",
    title: "Architect, Digital Design",
    image: "https://static.wixstatic.com/media/ee7e9e_117c986bb70c42dab4436a7b5e5502cd~mv2.jpg/v1/fill/w_420,h_420,al_c,lg_1,q_80,enc_avif,quality_auto/Abhra1_edited.jpg",
    linkedin: "https://www.linkedin.com/in/abhrabagchi",
    description:
      "Abhra has a rich and diverse experience in Digital Design. He has worked with Google, Qualcomm, and Intel after graduating from IISc with an M.Tech in Electronic Design and B.Tech from IIEST, Shibpur. He has contributed to Coherent Caches for GPUs, WiFi 6/6E PHY, Memory Controllers, and High-Speed IO.",
  },
  {
    name: "Shabaaz N Syed",
    title: "Director, Custom Layout",
    image: "https://static.wixstatic.com/media/ee7e9e_1ba6aa96e677472f900485745b407beb~mv2.jpg/v1/fill/w_433,h_433,al_c,lg_1,q_80,enc_avif,quality_auto/Shabaaz_1_circle_edited.jpg",
    linkedin: "https://www.linkedin.com/in/shabaazsyed",
    description:
      "Shabaaz has extensive experience in custom layout and chip integration for complex SoCs and ICs. He previously worked with Maxlinear and Western Digital after earning his B.Tech in Electronics from SDM College of Engineering and Technology, Dharwad. His expertise includes multi-protocol SerDes, RF transceivers, and high-performance analog ICs.",
  },
];

const About = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="max-w-7xl mx-auto px-6 py-12 text-center mt-20"
      >
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          About FermionIC Design
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
          FermionIC Design is a fabless semiconductor company developing IPs and chipsets for
          wireline and wireless communication systems. Our multiprotocol SERDES IP supports up to
          32Gbps NRZ data-rate, meeting electrical specifications of PCIe5, USB4, Ethernet, and JESD
          standards.
        </p>
      </motion.div>

      {/* Leadership Team Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {leadershipTeam.map((leader, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden"
          >
            <Card className="bg-gray-900 text-white border border-gray-800 shadow-lg rounded-xl p-6">
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

              <CardContent>
                <p className="text-gray-300 mb-4">
                  {expandedIndex === index
                    ? leader.description
                    : `${leader.description.slice(0, 150)}...`}
                </p>

                {/* Show More / Show Less Button */}
                <div className="mt-6 text-center">
                  <Button
                    onClick={() => toggleExpand(index)}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-800"
                  >
                    {expandedIndex === index ? "Show Less" : "View Details"}
                  </Button>
                </div>

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
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default About;
