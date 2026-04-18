import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../lib/api";


const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/properties?page=${pageNum}&limit=10`);
      setProperties(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Properties</h2>

      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="border rounded-md shadow-sm overflow-hidden"
            >
              {prop.image?.[0] && (
                <img
                  src={prop.image[0]}
                  alt={prop.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prop.name}</h3>
                <p className="text-sm text-gray-500">{prop.location}</p>
                <p className="text-sm mt-1">
                  {prop.beds} Beds • {prop.baths} Baths • {prop.sqft} sqft
                </p>
                <p className="text-green-600 font-bold mt-2">
                  AED {prop.base_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 border rounded ${
              page === idx + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
