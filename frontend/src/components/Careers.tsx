import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Briefcase, Users, Rocket, Mail } from "lucide-react";

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  // Function to toggle job details
  const toggleJobDetails = (index: number) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  // Job listings data
  const jobs = [
    {
      title: "Senior Manager / Principal Engineer - Silicon Validation",
      shortDesc: "Plan, develop, and execute tests to validate hardware SERDES...",
      fullDesc: "🔹 Plan, develop, and execute tests to validate hardware SERDES, RF-Front-End IP, power-management ICs, and integration at the system level.\n\n" +
        "🔹 Qualification: 10+ years of experience in silicon validation, debug/testing, and complete product lifecycle management.\n" +
        "🔹 Hands-on experience in chip bring-up and silicon debug.\n" +
        "🔹 Bachelor's degree in Electronics/Electrical/Instrumentation Engineering (Master’s Degree preferred).",
    },
    {
      title: "Analog/Mixed-Signal Design Engineer",
      shortDesc: "Experience: 2-5 years in Analog/Mixed-Signal designs...",
      fullDesc: "🔹 Experience: 2-5 years in Analog/Mixed-Signal designs with a BS/MS/PhD from a reputed university.\n" +
        "🔹 Expertise in PLL, Power Management, and SERDES transceivers.\n" +
        "🔹 Responsibilities: Work on state-of-the-art Analog/Mixed-Signal circuits, collaborate with layout engineers, and optimize design performance.",
    },
    {
      title: "Digital Design Engineer",
      shortDesc: "Experience: 2-5 years in RTL Design, DFT, Physical Design...",
      fullDesc: "🔹 Experience: 2-5 years in RTL Design, DFT, Physical Design with a BS/MS from a reputed university.\n" +
        "🔹 Experience in verification with UVM is a plus.\n" +
        "🔹 Responsibilities: RTL design, logic synthesis, timing closure, and debugging. Work closely with verification and backend teams.",
    },
    {
      title: "Physical Design Lead",
      shortDesc: "Manage full Physical Design of SoC from RTL to GDSII...",
      fullDesc: "🔹 Experience: 10+ years in Physical Design.\n" +
        "🔹 Responsibilities: Full-chip implementation, timing analysis, and working closely with front-end and verification teams.\n" +
        "🔹 Expertise in RTL to GDSII flow, Auto PnR, and project tracking.",
    },
    {
      title: "Project Interns",
      shortDesc: "Open to UG/PG students With VLSI specialization, willing to participate in 6/12 month remote Or on campus internship",
      fullDesc: "🔹 Open to UG/PG students With VLSI specialization, willing to participate in 6/12 month remote Or on campus internship\n" +
        "🔹 Responsibilities: Work on cutting-edge semiconductor projects under mentorship.\n" +
        "🔹 Gain hands-on experience in IC design, verification, and validation processes.\n" +
        "🔹 Collaborate with experienced engineers on real-world projects.",
    },
    {
      title: "Design Consultants",
      shortDesc: "Part-time design consultants in the area of analog mixed signal design Digital RTL, Digital Backend, SoC integration, Power management, RFIC Design",
      fullDesc: "🔹 Part-time design consultants in the area of analog mixed signal design Digital RTL, Digital Backend, SoC integration, Power management, RFIC Design\n" +
        "🔹 Flexible working arrangements for experienced professionals.\n" +
        "🔹 Responsibilities: Provide expert consultation on complex design challenges.\n" +
        "🔹 Work on specific project modules based on expertise and availability.\n" +
        "🔹 Mentor junior engineers and contribute to design reviews.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden">
      <Header />
      
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-12 mt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6 leading-relaxed pb-2">
            Transform Your Future, We Are Hiring <Rocket className="inline-block ml-2 text-cyan-400" size={48} />
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At <span className="text-cyan-400 font-semibold">Fermionic</span>, we're continuously looking for smart and passionate engineers ready to drive and contribute to our product roadmap.
          </p>
        </motion.div>

        {/* Hiring Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-600/50 p-8 rounded-xl shadow-2xl mb-16 text-center relative overflow-hidden group"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-blue-400 mr-3" size={32} />
              <h2 className="text-2xl font-bold text-white">Multiple Openings Available</h2>
            </div>
            <p className="text-lg font-medium text-gray-300 mb-4">
              We have multiple openings for{" "}
              <span className="text-cyan-400 font-bold">
                Analog Designers, Layout Engineers, Digital Designers, and Silicon Validation Engineers.
              </span>
            </p>
            <div className="flex items-center justify-center">
              <Mail className="text-green-400 mr-3" size={24} />
              <p className="text-lg font-medium">
                Contact us at{" "}
                <span className="font-semibold text-green-400">
                  careers[at]fermionic[dot]design
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="text-blue-400 mr-3" size={36} />
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Open Positions
            </h2>
          </div>
          <Separator className="mb-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </motion.div>

        {/* Job Listings */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="w-full"
            >
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl transition-all duration-300 hover:border-gray-600/70 h-full relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
                </div>
                
                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                      <Briefcase size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold text-white leading-tight">
                      {job.title}
                    </CardTitle>
                  </div>
                  
                  <CardDescription className="text-gray-300 flex-grow mb-4">
                    <AnimatePresence mode="wait">
                      {expandedJob === index ? (
                        <motion.p
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="whitespace-pre-line leading-relaxed"
                        >
                          {job.fullDesc}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="collapsed"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="leading-relaxed"
                        >
                          {job.shortDesc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </CardDescription>

                  {/* Read More Button */}
                  <Button
                    className="mt-auto w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => toggleJobDetails(index)}
                  >
                    {expandedJob === index ? "Show Less ▲" : "Read More ▼"}
                  </Button>
                </CardContent>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Careers;
