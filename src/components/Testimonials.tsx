import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Enclave Horizon helped me find the perfect villa for my family. Their expertise in Dubai real estate is unmatched!'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Expatriate',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Moving to Dubai was seamless thanks to their professional team. They understood exactly what I was looking for.'
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      role: 'Investor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Excellent investment advice and property recommendations. My portfolio has grown significantly with their guidance.'
    }
  ];

  return (
    <section className="py-16 bg-cover bg-center bg-no-repeat relative" 
             style={{backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/6868acdcdd73fc8bcb3e80f0_1754031184907_c86f48be.png')`}}>
      <div className="absolute inset-0 bg-white opacity-95"></div>
      <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 relative">
              <Quote className="h-8 w-8 text-emerald-800 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Testimonials;