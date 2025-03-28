"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button"; // Importing Button for consistency

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Data for Silicon IP sections
const siliconIPData = [
  {
    title: "General Purpose & Special Purpose PLLs",
    description:
      "Fermionic provides a configurable PLL-Core with ring or multi-gear LC VCO for SoC clocking needs. Our PLL-core has been verified in SERDES applications.",
    features: [
      "Fractional-N PLL core: Programmable frequency synthesizers.",
      "Compact low-area ring PLLs.",
      "Multi-Phase PLL cores.",
    ],
  },
  {
    title: "Deliverables",
    features: [
      "GDSII, CDL Netlist",
      "Verilog Model with loop dynamics",
      "Liberty timing models (.lib)",
      "Integration Support",
    ],
  },
  {
    title: "Fermionic SerDes PMA",
    description:
      "Our silicon-proven SerDes supports up to PCIe Gen5 (32Gbps) with multi-protocol capabilities.",
    features: [
      "Supports USB4.0, PCIe Gen1/2/3/4/5, JESD204A/B/C",
      "Integrated TX PLL",
      "Programmable TX-FFE",
      "PRBS Generator and Checker",
    ],
  },
  {
    title: "Analog General Purpose IPs",
    features: [
      "Bandgap Reference",
      "LDO, Power-management, and supervisory control IPs",
      "General Purpose ADC",
      "CML Buffers for low-jitter on-chip clock distribution",
    ],
  },
];

const SiliconIP = () => {
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
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Silicon IP Portfolio
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
          Fermionic Design offers a wide range of <strong>PPA-optimized</strong> SERDES IPs, PLLs,
          and Analog-Glue IPs. Our <strong>silicon-proven</strong> solutions ensure robust design flow and seamless integration.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {siliconIPData.map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden"
          >
            <Card className="bg-gray-900 text-white border border-gray-800 shadow-lg rounded-xl p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r text-white">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expandedIndex === index && section.description && (
                  <p className="text-gray-300 mb-4">{section.description}</p>
                )}

                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  {section.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <div className="mt-6 text-center">
                  <Button
                    onClick={() => toggleExpand(index)}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:from-blue-600 hover:to-blue-800"
                  >
                    {expandedIndex === index ? "Hide Details" : "View Details"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default SiliconIP;
