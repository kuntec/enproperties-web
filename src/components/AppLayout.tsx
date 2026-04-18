import React from 'react';
import Header from './Header';
import Hero from './Hero';
import PropertyGrid from './PropertyGrid';
import CompanyInfo from './CompanyInfo';
import Testimonials from './Testimonials';
import Footer from './Footer';
import HeroCta from './HeroCta';
import ExploreSection from './ExploreSection';
import LifeSection from './LifeSection';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header variant="home"/>
      <Hero
          title="Where Real Estate Meets Lifestyle"
          subtitle="Enclave Horizon is a trusted real estate firm in Dubai, known for making property buying, selling, and renting simple."
        />
        <ExploreSection/>
      <PropertyGrid />
      <CompanyInfo />
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
      <LifeSection/>
      <HeroCta image="https://cdn.pixabay.com/photo/2017/02/27/12/04/dubai-3-2103072_1280.jpg" />
      <ExploreSection/>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AppLayout;
