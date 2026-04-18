import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyInfo from '@/components/CompanyInfo';
import { Award, Users, Building, Globe, Heart, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header variant="home"/>
      
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" 
               style={{backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031184907_c86f48be.png')`}}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Enclave Horizon</h1>
            <p className="text-xl">Dubai's Premier Real Estate Partner</p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Founded in 2025, Enclave Horizon has grown to become Dubai's most trusted real estate agency.
                We specialize in luxury properties across Dubai's most prestigious neighborhoods.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Our team of certified professionals brings decades of combined experience in Dubai's dynamic 
                property market, ensuring our clients receive expert guidance at every step.
              </p>
              <p className="text-gray-600 text-lg">
                Whether you're buying, selling, or investing, we're committed to delivering exceptional 
                results and building lasting relationships with our clients.
              </p>
            </div>
            <div>
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031186082_dc94facd.png" 
                alt="Palm Jumeirah Dubai"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Integrity</h3>
              <p className="text-gray-600">
                We build lasting relationships through honest communication and transparent dealings
              </p>
            </div>
            
            <div className="text-center p-6">
              <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Client First</h3>
              <p className="text-gray-600">
                Your success is our priority. We go above and beyond to exceed expectations
              </p>
            </div>
            
            <div className="text-center p-6">
              <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every transaction and interaction
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CompanyInfo />
      <Footer />
    </div>
  );
};

export default About;