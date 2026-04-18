import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyInfo from '@/components/CompanyInfo';
import { Award, Users, Building, Globe, Heart, Shield } from 'lucide-react';
import SearchBarUI from '@/components/SearchBarUI';
import PropertyGrid from '@/components/PropertyGrid';

const Commercial: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header variant="home"/>
      
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" 
               style={{backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031184907_c86f48be.png')`}}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Commercial Properties for Sale in Dubai</h1>
            <p className="text-xl">Dubai's Premier Real Estate Partner</p>
          </div>
        </div>
      </section>
    

      <PropertyGrid/>     


     
      
      <CompanyInfo />
      <Footer />
    </div>
  );
};

export default Commercial;