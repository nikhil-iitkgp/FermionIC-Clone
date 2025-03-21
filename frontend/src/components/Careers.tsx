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
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen flex flex-col">
      <Header />
      
      <div className="w-full flex-grow px-4 md:px-8 lg:px-16 xl:px-24 py-12 min-h-screen flex flex-col justify-center">
        {/* Hero Section with Improved Spacing */}
        <div className="w-full text-center mt-12 md:mt-16 lg:mt-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
            Transform Your Future, <br className="block md:hidden" /> We Are Hiring 🚀
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            At Fermionic, we’re continuously looking for smart and passionate engineers ready to drive and contribute to our product roadmap.
          </p>
        </div>

        {/* Hiring Section */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg my-12 text-center border border-gray-700 w-full max-w-3xl mx-auto">
          <p className="text-lg font-medium text-white">
            🎯 We have multiple openings for{" "}
            <span className="text-blue-400 font-bold">
              Analog Designers, Layout Engineers, Digital Designers, and Silicon Validation Engineers.
            </span>
          </p>
          <p className="text-lg font-medium mt-2">
            📩 Contact us at{" "}
            <span className="font-semibold text-blue-400">
              careers[at]fermionic[dot]design
            </span>
          </p>
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Open Positions 🔍</h2>
        <Separator className="mb-8" />

        {/* Job Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full"
            >
              <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-xl transition-transform hover:scale-105 w-full">
                <CardContent className="p-6 flex flex-col h-full w-full">
                  <CardTitle className="text-lg md:text-xl font-semibold mb-2 text-white">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 flex-grow">
                    <AnimatePresence>
                      {expandedJob === index ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="whitespace-pre-line"
                        >
                          {job.fullDesc}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {job.shortDesc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </CardDescription>

                  {/* Read More Button */}
                  <Button
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={() => toggleJobDetails(index)}
                  >
                    {expandedJob === index ? "Show Less ▲" : "Read More ▼"}
                  </Button>
                </CardContent>
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
