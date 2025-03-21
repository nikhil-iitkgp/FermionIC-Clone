import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const SiliconIp = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white pt-12">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Silicon IP Portfolio</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Fermionic Design offers a wide range of <strong>PPA-optimized</strong> 
            SERDES IPs, PLLs, and Analog-Glue IPs. Our <strong>silicon-proven</strong> 
            solutions ensure robust design flow and seamless integration.
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* General Purpose PLLs */}
          <Card className="bg-gray-900 text-white border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">
                General Purpose & Special Purpose PLLs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Fermionic provides a configurable PLL-Core with ring or multi-gear LC VCO 
                for SoC clocking needs. Our PLL-core has been verified in SERDES applications.
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-400">
                <li><strong>Fractional-N PLL core:</strong> Programmable frequency synthesizers.</li>
                <li>Compact low-area ring PLLs.</li>
                <li>Multi-Phase PLL cores.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card className="bg-gray-900 text-white border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">
                Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-2 text-gray-400">
                <li>GDSII, CDL Netlist</li>
                <li>Verilog Model with loop dynamics</li>
                <li>Liberty timing models (.lib)</li>
                <li>Integration Support</li>
              </ul>
            </CardContent>
          </Card>

          {/* Fermionic SerDes PMA */}
          <Card className="bg-gray-900 text-white border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">
                Fermionic SerDes PMA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our <strong>silicon-proven</strong> SerDes supports up to <strong>PCIe Gen5 (32Gbps)</strong> 
                with multi-protocol capabilities.
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-400">
                <li>Supports USB4.0, PCIe Gen1/2/3/4/5, JESD204A/B/C</li>
                <li>Integrated TX PLL</li>
                <li>Programmable TX-FFE</li>
                <li>PRBS Generator and Checker</li>
              </ul>
            </CardContent>
          </Card>

          {/* Analog General Purpose IPs */}
          <Card className="bg-gray-900 text-white border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">
                Analog General Purpose IPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-6 space-y-2 text-gray-400">
                <li>Bandgap Reference</li>
                <li>LDO, Power-management, and supervisory control IPs</li>
                <li>General Purpose ADC</li>
                <li>CML Buffers for low-jitter on-chip clock distribution</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SiliconIp;
