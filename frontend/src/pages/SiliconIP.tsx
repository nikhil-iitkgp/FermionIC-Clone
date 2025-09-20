"use client";

import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Cpu, Zap, Radio, Shield, Brain, Activity } from "lucide-react";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Data for Silicon IP sections with icons and enhanced styling
const siliconIPData = [
  {
    title: "SERDES for High Speed Chip to chip backplane Interconnects",
    description:
      "Data rate: 5 to 10 Gbps Multi Serdes Transceivers, PHY Synthesizer, Data Lane Multiplexer, Packet Processor, Trace Encoder, JESD, JTAG, USB 3.0",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Data Converters",
    description:
      "Pipeline ADC & SAR ADC, Delta Sigma ADC, Dual Slope ADC, RF - 5 to 10 Gbps Serializer/Deserializer, 100 MSPS",
    icon: Activity,
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    title: "Power Management IPs",
    description:
      "100% Digital DCDC Switched Capacitor DCDC Converters, Inductive based Buck-Boost Converters, Low Dropout Regulators, 10 mA to 1A, Battery charging Interface, Output Power levels: 100mA to 1A",
    icon: Zap,
    gradient: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-400/10 to-purple-500/10",
  },
  {
    title: "Radiation Hardened IPs for Space Application",
    description:
      "Several Radiation Hardened by Design (RHBD) IPs with SEL Tolerant Circuit Schemes",
    icon: Shield,
    gradient: "from-purple-500 to-blue-500",
    bgGradient: "from-purple-500/10 to-blue-500/10",
  },
  {
    title: "AI Compute Cores",
    description:
      "Compute cores for AI acceleration, In Memory Compute cores for Deep Neural Network and Spiking Neural Network, Multi-core architectures for CNN modules, suitable for low power edge computing applications",
    icon: Brain,
    gradient: "from-cyan-400 to-purple-400",
    bgGradient: "from-cyan-400/10 to-purple-400/10",
  },
  {
    title: "Analog Frontend",
    description:
      "Signal Acquisition and Signal Conditioning Units, Amplification of Low Noise Amplifier, Voltage Controlled Oscillator, Frequency Stabilization, Impedance Boosting, Offset Trimming, Filtering, Current Conveyor, Instrumentation amplifier, ultra low current sensing",
    icon: Radio,
    gradient: "from-blue-600 to-cyan-400",
    bgGradient: "from-blue-600/10 to-cyan-400/10",
  },
];

const SiliconIP = () => {

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 text-center mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6 leading-relaxed pb-2">
          Silicon IP's
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          SiktaSys offers a wide range of <span className="text-cyan-400 font-semibold">PPA-optimized</span> SERDES IPs, Data Converters, Power Management IPs,
          and Analog Frontend solutions. Our <span className="text-blue-400 font-semibold">silicon-proven</span> solutions ensure robust design flow and seamless integration.
        </p>
      </motion.div>

      {/* IP Categories */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siliconIPData.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="rounded-xl overflow-hidden h-full"
            >
              <Card className={`bg-gradient-to-br ${section.bgGradient} backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl p-6 h-full flex flex-col relative overflow-hidden group hover:border-gray-600/70 transition-all duration-300`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
                
                <CardHeader className="pb-4 text-center relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${section.gradient} flex items-center justify-center shadow-lg`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white leading-tight min-h-[3rem] flex items-center justify-center">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow relative z-10">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
                
                {/* Hover Effect Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}></div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default SiliconIP;
