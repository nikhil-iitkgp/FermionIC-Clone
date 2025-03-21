import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // State for form status
  const [status, setStatus] = useState({ success: false, error: "" });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ success: false, error: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus({ success: true, error: "" });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "", message: "" });
    } catch (error) {
      setStatus({ success: false, error: "Error sending message. Try again!" });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <motion.main
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center px-6 sm:px-12 lg:px-24 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl text-center"
        >
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Get in Touch with Us
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Leave your message, and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 w-full max-w-5xl">
          {[
            {
              title: "Main Office",
              address: `FermionIC Design Pvt Ltd
                GVR Vision, 268, 3rd Floor, AECS Layout - A Block, Marathahalli,
                Bengaluru, Karnataka 560037, India`,
              iconColor: "text-blue-400",
            },
            {
              title: "Sales Office",
              address: `FermionIC Design Pvt Ltd
                Inspire Workplace, 134-135, Service Rd, LRDE Layout,
                Doddanekkundi, Bangalore, Karnataka 560037, India`,
              iconColor: "text-green-400",
            },
          ].map((office, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                  <MapPin className={office.iconColor} /> {office.title}
                </h3>
                <p className="mt-3 text-gray-300 whitespace-pre-line">
                  {office.address}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 mt-16 p-8 shadow-lg rounded-lg border border-gray-700 w-full max-w-4xl"
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            Send Us a Message
          </h2>

          {status.success && (
            <p className="text-green-500 text-center mb-4">
              Message sent successfully!
            </p>
          )}
          {status.error && (
            <p className="text-red-500 text-center mb-4">{status.error}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="text-center">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Send size={20} /> Send Message
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
