import React from 'react';
import { Award, Users, Building, TrendingUp } from 'lucide-react';

const CompanyInfo: React.FC = () => {
  const stats = [
    { icon: Building, value: '5000+', label: 'Properties Sold' },
    { icon: Users, value: '2500+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate' }
  ];

  return (
    <section className="py-16 bg-cover bg-center bg-no-repeat relative" 
             style={{backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031183666_81017299.png')`}}>
      <div className="absolute inset-0 bg-primary opacity-75"></div>
      <div className="relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Enclave Horizon?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We are Dubai's leading real estate agency with a proven track record of excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-white">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Award Winning</h3>
            <p className="text-white">
              Recognized as Dubai's top real estate agency for three consecutive years
            </p>
          </div>
          
          <div className="text-center">
            <Users className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
            <p className="text-white">
              Our certified professionals have deep knowledge of Dubai's property market
            </p>
          </div>
          
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Market Leaders</h3>
            <p className="text-white">
              Leading the market with innovative solutions and exceptional service
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default CompanyInfo;