import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyGrid from '@/components/PropertyGrid';
import PropertySearch from '@/components/PropertySearch';

const Properties: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Properties</h1>
            <p className="text-lg text-gray-600">Browse our complete collection of premium Dubai properties</p>
          </div>
          <PropertySearch />
        </div>
      </div>
      <PropertyGrid />
      <Footer />
    </div>
  );
};

export default Properties;