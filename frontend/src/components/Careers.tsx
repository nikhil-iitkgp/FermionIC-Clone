import Header from "../components/Header"; // Adjust based on your structure
import Footer from "../components/Footer"; // Adjust based on your structure

const Careers = () => {
  return (
    <div className="container w-screen mx-auto  ">
      {/* Header */}
      <Header />

      {/* Career Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900">
        {/* Hero Section */}
        <h1 className="text-4xl font-bold text-center mb-6">
          Transform your Future, We are hiring
        </h1>
        <p className="text-lg text-center text-gray-700 mb-10">
          At Fermionic, we’re continuously looking for smart and passionate
          engineers ready to drive and contribute to our product roadmap. We
          seek people who are more intelligent than us. That's how we create a
          company of high-performance innovators for a meaningful impact on
          semiconductor IC and product design.
        </p>

        {/* Hiring Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10 text-center">
          <p className="text-lg font-medium">
            We have multiple openings for Analog Designers, Layout Engineers,
            Digital Designers, and Silicon Validation Engineers.
          </p>
          <p className="text-lg font-medium mt-2">
            📩 Please contact us at{" "}
            <span className="font-semibold">
              careers[at]fermionic[dot]design
            </span>
          </p>
        </div>

        {/* Job Openings Section */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          Open Positions
        </h2>

        {/* Job Listings */}
        <div className="space-y-8">
          {/* Position 1 */}
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">
              Senior Manager / Principal Engineer - Silicon Validation
            </h3>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Responsibilities:</span> Plan,
              develop, and execute tests to validate hardware SERDES,
              RF-Front-End IP, power-management ICs, and integration at the
              system level.
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Qualification:</span> 10+ years of
              experience in silicon validation, debug/testing, and complete
              product lifecycle management. Hands-on experience in chip bring-up
              and silicon debug. Bachelor's degree in
              Electronics/Electrical/Instrumentation Engineering (Master’s
              Degree preferred).
            </p>
            <p className="mt-3 text-blue-600 font-semibold cursor-pointer">
              Read more
            </p>
          </div>

          {/* Position 2 */}
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">
              Analog/Mixed-Signal Design Engineer
            </h3>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Experience:</span> 2-5 years in
              Analog/Mixed-Signal designs with a BS/MS/PhD from a reputed
              university. Experience in PLL, Power Management, and SERDES
              transceivers.
            </p>
            <p className="mt-3 text-blue-600 font-semibold cursor-pointer">
              Read more
            </p>
          </div>

          {/* Position 3 */}
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">Digital Design Engineer</h3>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Experience:</span> 2-5 years in
              RTL Design, DFT, Physical Design with a BS/MS from a reputed
              university. Experience in verification with UVM is a plus.
            </p>
            <p className="mt-3 text-blue-600 font-semibold cursor-pointer">
              Read more
            </p>
          </div>

          {/* Position 4 */}
          <div className="bg-white p-6 border rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">Physical Design Lead</h3>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Job Description:</span> Manage
              full Physical Design of SoC from RTL to GDSII Implementation,
              Project Tracking, Floorplanning, and Place & Route. Lead Auto PnR
              of physical design partitions.
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Experience:</span> 10 years.
            </p>
            <p className="mt-3 text-blue-600 font-semibold cursor-pointer">
              Read more
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Careers;
