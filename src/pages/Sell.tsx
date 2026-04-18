import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyInfo from '@/components/CompanyInfo';
import { Award, Users, Building, Globe, Heart, Shield } from 'lucide-react';
import SearchBarUI from '@/components/SearchBarUI';
import PropertyGrid from '@/components/PropertyGrid';
import { API_BASE_URL } from '@/lib/api';
import { toast } from 'sonner';

const Sell: React.FC = () => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    offering_type: "",
    property_address: "",
    preferred_date: "",
    preferred_time: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch(`${API_BASE_URL}/sell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (res.ok) {
      toast.success("Valuation request submitted!");
      // Clear form here
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        offering_type: "",
        property_address: "",
        preferred_date: "",
        preferred_time: "",
      });
    } else {
      toast.error("Failed to submit request.");
    }
  } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen">
      <Header variant="home"/>
      
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" 
               style={{backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031184907_c86f48be.png')`}}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Properties for Sale in Dubai</h1>
            <p className="text-xl">Dubai's Premier Real Estate Partner</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-16 bg-white rounded-lg shadow-lg">
      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          List Your Property with <span className="text-blue-800">EnProperties</span>
        </h2>
        <p className="text-gray-600 mb-4">
          Whether you’re thinking about selling, exploring your options, or simply curious, knowing your property’s true value is the smartest place to start. 
          We combine real-time market data with on-the-ground expertise to deliver accurate and honest valuations tailored to your property and location.
        </p>
        <p className="text-gray-600">
          Our process is quick and obligation-free. Submit the form and our valuation specialist will contact you within 24 hours.
        </p>

        <div className="mt-8 flex gap-6">
          <div className="text-center">
            <div className="text-primary font-bold">📍</div>
            <p className="font-semibold mt-2">Local Knowledge</p>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold">🌟</div>
            <p className="font-semibold mt-2">300+ Experts</p>
          </div>
          <div className="text-center">
            <div className="text-primary font-bold">🕒</div>
            <p className="font-semibold mt-2">Available 24/7</p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="first_name" onChange={handleChange} value={formData.first_name} type="text" placeholder="First Name"
            className="border px-4 py-2 rounded w-full" required />
          <input name="last_name" onChange={handleChange} value={formData.last_name} type="text" placeholder="Last Name"
            className="border px-4 py-2 rounded w-full" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email"
            className="border px-4 py-2 rounded w-full" required />
          <input name="phone" onChange={handleChange} value={formData.phone} type="tel" placeholder="Phone Number"
            className="border px-4 py-2 rounded w-full" required />
        </div>

        <input name="offering_type" onChange={handleChange} value={formData.offering_type} type="text" placeholder="Offering Type (Sell, Rent)"
          className="border px-4 py-2 rounded w-full" required />

        <input name="property_address" onChange={handleChange} value={formData.property_address} type="text" placeholder="Property Address"
          className="border px-4 py-2 rounded w-full" required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="preferred_date" onChange={handleChange} value={formData.preferred_date} type="date"
            className="border px-4 py-2 rounded w-full" required />
          <input name="preferred_time" onChange={handleChange} value={formData.preferred_time} type="time"
            className="border px-4 py-2 rounded w-full" required />
        </div>

        <button type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded hover:bg-primary-light transition">
          BOOK YOUR VALUATION
        </button>
      </form>
    </div>

  
      <CompanyInfo />
      <Footer />
    </div>
  );
};

export default Sell;