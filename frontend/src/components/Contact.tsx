import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { toast } from "react-hot-toast"; 
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Track submission status
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! 🎉", {
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid #059669',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '16px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
        duration: 4000,
      }); 
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      toast.error("Error sending message. Please try again. ❌", {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          fontWeight: '600',
          border: '1px solid #dc2626',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '16px',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
        duration: 4000,
      }); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col overflow-x-hidden overflow-y-auto">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12 text-center mt-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6 leading-relaxed pb-2">
          Get in Touch with Us
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
          Leave your message, and we'll get back to you as soon as possible. We're here to help with your <span className="text-cyan-400 font-semibold">semiconductor solutions</span>.
        </p>
      </motion.div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center px-6 sm:px-12 lg:px-24 pb-32"
      >

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl overflow-hidden">
          {[
            {
              title: "Main Office",
              address: `Siktasys Pvt Ltd. 3A Block-20,New Joth Shibrampur Road,
Thakurpukur Mahestola, Kolkata,
West Bengal , 700141`,
              iconColor: "text-blue-400",
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-500/10 to-cyan-500/10",
            },
            {
              title: "R&D Lab",
              address: `R&D Lab: AVLSI Lab, IIT Kharagpur, Kharagpur, West Bengal,
721302`,
              iconColor: "text-green-400",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-500/10 to-emerald-500/10",
            },
          ].map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="h-full"
            >
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl p-8 h-full flex flex-col relative overflow-hidden group hover:border-gray-600/70 transition-all duration-300 max-w-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${office.bgGradient}`}></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${office.gradient} flex items-center justify-center`}>
                      <MapPin className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {office.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 whitespace-pre-line flex-grow leading-relaxed text-lg">
                    {office.address}
                  </p>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${office.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-xl p-8 w-full max-w-4xl relative overflow-hidden group mt-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
                  <Send className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Send Us a Message
                </h2>
              </div>
            </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone
                </Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            {/* Address & Message */}
            <div>
              <Label htmlFor="address" className="text-gray-300">
                Address
              </Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} required />
            </div>
            <div>
              <Label htmlFor="message" className="text-gray-300">
                Message
              </Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                <Send size={22} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
          </div>
          
          {/* Hover Effect Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Contact;
