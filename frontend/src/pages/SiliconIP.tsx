import Footer from "../components/Footer"; 
import Header from "../components/Header";

const SiliconIp = () => {
  return (
    <div className="container w-screen mx-auto  ">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Silicon IP Portfolio
        </h1>

        {/* Introduction */}
        <p className="text-lg text-center mb-12">
          Fermionic Design offers a wide portfolio of PPA-optimized SERDES IPs,
          wide-range PLLs, and Analog-Glue IPs in various nodes. Our IPs are
          highly programmable, developed using a robust design flow, and come
          with after-sales integration support and documentation.
        </p>

        {/* Section: PLLs & Clock Distribution */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            General Purpose & Special Purpose PLLs
          </h2>
          <p className="text-lg">
            Fermionic provides a configurable PLL-Core with ring or multi-gear
            LC VCO for SoC clocking needs. Our PLL-core has been verified in
            SERDES applications.
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              <strong>Fractional-N PLL core:</strong> Programmable,
              general-purpose frequency synthesizers.
            </li>
            <li>
              <strong>Zero-Delay-Buffer PLL Cores:</strong> For multi-node clock
              distribution.
            </li>
            <li>Compact low-area ring PLLs</li>
            <li>General-purpose core-supply programmable PLL-core</li>
            <li>Multi-Phase PLL cores</li>
          </ul>
        </div>

        {/* Section: Deliverables */}
        <div className="mb-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Deliverables</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>GDSII, CDL Netlist</li>
            <li>Verilog Model with loop dynamics</li>
            <li>Liberty timing models (.lib)</li>
            <li>LEF layout abstract</li>
            <li>Application Note</li>
            <li>User Guide</li>
            <li>Integration Support</li>
          </ul>
        </div>

        {/* Section: Fermionic SerDes PMA */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Fermionic SerDes PMA</h2>
          <p className="text-lg mb-4">
            Silicon-proven in a 28nm TSMC process, our SerDes architecture
            supports up to PCIe Gen5 (32Gbps) data rates.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Soft RTL for SERDES PIPE PCS</li>
            <li>
              Supports multi-protocol USB4.0, PCIe Gen1/2/3/4/5, JESD204A/B/C
            </li>
            <li>Integrated TX PLL</li>
            <li>Programmable TX-FFE</li>
            <li>Suitable for low-latency applications</li>
            <li>Programmable CTLE and adaptive 7-Tap DFE</li>
            <li>Non-destructive Eye-monitor</li>
            <li>PRBS Generator and Checker</li>
          </ul>
        </div>

        {/* Section: Analog General Purpose IPs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Analog General Purpose IPs
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Bandgap Reference</li>
            <li>LDO, Power-management, and supervisory control IPs</li>
            <li>General Purpose ADC</li>
            <li>
              CML Buffers and Multiplexers for low-jitter on-chip clock
              distribution
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiliconIp;
