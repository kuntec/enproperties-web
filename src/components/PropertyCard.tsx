import React from 'react';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/api';

interface PropertyCardProps {
  _id: string;
  name: string;
  location: string;
  base_price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  type: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  _id,
  name,
  location,
  base_price,
  beds,
  baths,
  sqft,
  image,
  type
}) => {

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the parent link click
    window.open("http://wa.me/+971522612156", '_blank'); // open external URL in new tab
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={getImageUrl(image)}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {type}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
     
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{beds}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{baths}</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{sqft}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{base_price} AED</div>
          
         
  <button className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300" 
  onClick={handleWhatsappClick}>
  <i className="fa-brands fa-whatsapp"></i>Whatsapp
  </button>

          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300">
            View Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;