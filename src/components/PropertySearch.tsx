import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

const PropertySearch: React.FC = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });

  const handleSearch = () => {
    console.log('Search:', searchData);
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            value={searchData.location}
            onChange={(e) => setSearchData({...searchData, location: e.target.value})}
          >
            <option value="">Select Location</option>
            <option value="downtown">Downtown Dubai</option>
            <option value="marina">Dubai Marina</option>
            <option value="jbr">JBR</option>
            <option value="business-bay">Business Bay</option>
            <option value="jumeirah">Jumeirah</option>
          </select>
        </div>

        <div className="relative">
          <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            value={searchData.propertyType}
            onChange={(e) => setSearchData({...searchData, propertyType: e.target.value})}
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            value={searchData.priceRange}
            onChange={(e) => setSearchData({...searchData, priceRange: e.target.value})}
          >
            <option value="">Price Range</option>
            <option value="0-1m">Up to 1M AED</option>
            <option value="1m-3m">1M - 3M AED</option>
            <option value="3m-5m">3M - 5M AED</option>
            <option value="5m+">5M+ AED</option>
          </select>
        </div>

        <button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </button>
      </div>
    </div>
  );
};

export default PropertySearch;