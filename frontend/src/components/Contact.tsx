import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // State for submission status
  const [status, setStatus] = useState({ success: false, error: "" });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ success: false, error: "" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
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
    <div className="w-screen min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Contact Page Content */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">Get in Touch with Us</h1>
          <p className="text-lg text-gray-700 mt-4">
            Please leave your requirements, and we shall get back to you.
          </p>
        </div>

        {/* Address Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 w-full max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900">Main Office Address</h3>
            <p className="mt-3 text-gray-700">
              FermionIC Design Private Limited <br />
              GVR Vision, 268, 3rd Floor, AECS Layout - A Block, Marathahalli, <br />
              Bengaluru, Karnataka 560037, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900">Sales Office Address</h3>
            <p className="mt-3 text-gray-700">
              FermionIC Design Private Limited <br />
              Inspire Workplace, 134-135, Service Rd, LRDE Layout, <br />
              Doddanekkundi, Bangalore, Karnataka 560037, India
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white mt-12 p-8 shadow-lg rounded-lg border border-gray-200 w-full max-w-3xl">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Send Us a Message</h2>

          {status.success && (
            <p className="text-green-600 text-center mb-4">Message sent successfully!</p>
          )}
          {status.error && <p className="text-red-600 text-center mb-4">{status.error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white text-black"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white text-black"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black "
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black "
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Type your message here...</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-white text-black"
                rows={4}
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
