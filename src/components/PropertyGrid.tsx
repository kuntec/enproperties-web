import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import PropertyCard2 from './PropertyCard2';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api';
import SearchBarUI from './SearchBarUI';

type PropertyGridProps = {
  purpose?: 'Buy' | 'Rent';
};

const PropertyGrid: React.FC<PropertyGridProps> = ({ purpose }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/properties`, {
          params: purpose ? { purpose } : undefined,
        });
        const data = (res.data.properties || []).map((p: any) => ({
          ...p,
          image: Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : '',
        }));
        setProperties(data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [purpose]);

 const onSearch = (data: any[]) => {
  const response = data.map((p: any) => ({
    ...p,
    image: Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : '',
  }));
    setProperties(response);
  };

  return (
    <>
          <section className="py-16 bg-white">
          <SearchBarUI onSearch={onSearch}/>
          </section>

    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2> */}
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties in Dubai's most sought-after locations
          </p> */}
        </div>

       
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {properties.map((property) => (
             <Link to={`/property/${property._id}`} key={property._id} className="block">
            <PropertyCard key={property.id} {...property} />
             </Link>

          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/properties">
          <button className="bg-primary hover:bg-primary text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
            View All Properties
          </button>
          </Link>

        </div>
      </div>
    </section>
    </>
  );
};

export default PropertyGrid;