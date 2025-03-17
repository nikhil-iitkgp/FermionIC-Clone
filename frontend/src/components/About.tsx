import Header from "../components/Header"; // Adjust path based on your folder structure
import Footer from "../components/Footer"; // Adjust path based on your folder structure

const About = () => {
  return (
    <div className="container w-screen mx-auto ">
      {/* Header */}
      <Header />

      {/* About Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Delivering Custom IC Solutions from Concept to Success
        </h1>

        {/* Introduction */}
        <p className="text-lg text-center mb-12">
          FermionIC Design is a fabless semiconductor company developing IPs and chipsets for wireline and wireless communication systems.
          Our multiprotocol SERDES IP supports up to 32Gbps NRZ data-rate and meets electrical specifications of PCIe5, USB4, Ethernet, and JESD standards.
          FermionIC’s innovative SERDES architecture guarantees best-in-class latency across various nodes, multiple foundries, and protocols.
          Our upcoming Hybrid Beamformer IC enables miniaturization of phased-array active antenna systems for 5G, SATCOM, and Radar.
        </p>

        {/* Leadership Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Leadership</h2>

          {/* Leader Profiles */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Gautam Kumar Singh */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">Gautam Kumar Singh</h3>
              <p className="text-lg text-gray-700">CEO</p>
              <p className="mt-2 text-gray-800">
                Gautam is an accomplished semiconductor professional with experience in IC and IP product design and business creation.
                He has held senior engineering positions at top semiconductor companies in India, driving product definition and business
                unit management for high-speed interconnect communication IPs.
                He holds an M.Sc (Engg) degree from IISc Bangalore and a B.Tech from IIT Varanasi.
                Gautam has been part of several successful semiconductor startups in India.
              </p>
            </div>

            {/* Prasun Bhattacharyya */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">Prasun Bhattacharyya</h3>
              <p className="text-lg text-gray-700">CTO</p>
              <p className="mt-2 text-gray-800">
                With two decades of experience, Prasun has led cutting-edge designs in top semiconductor companies.
                He was responsible for designing and productizing industry-leading RF transceivers, high-performance PLLs, ADCs, TIAs, and SERDES.
                He holds a B.E. in Electronics and Communication from IIEST, Shibpur, West Bengal, and was part of one of India’s most successful semiconductor startups.
              </p>
            </div>

            {/* Abhra Bagchi */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">Abhra Bagchi</h3>
              <p className="text-lg text-gray-700">Architect, Digital Design</p>
              <p className="mt-2 text-gray-800">
                Abhra has a rich and diverse experience in Digital Design. He has worked with Google, Qualcomm, and Intel after graduating from IISc with an M.Tech in Electronic Design and B.Tech from IIEST, Shibpur.
                He has contributed to Coherent Caches for GPUs, WiFi 6/6E PHY, Memory Controllers, and High-Speed IO.
              </p>
            </div>

            {/* Shabaaz N Syed */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold">Shabaaz N Syed</h3>
              <p className="text-lg text-gray-700">Director, Custom Layout</p>
              <p className="mt-2 text-gray-800">
                Shabaaz has extensive experience in custom layout and chip integration for complex SoCs and ICs.
                He previously worked with Maxlinear and Western Digital after earning his B.Tech in Electronics from SDM College of Engineering and Technology, Dharwad.
                His expertise includes multi-protocol SerDes, RF transceivers, and high-performance analog ICs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
