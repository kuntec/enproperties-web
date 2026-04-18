import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, API_BASE_IMAGE_URL } from '../../lib/api';


export default function ViewProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!property) return <p className="p-4 text-red-600">Property not found</p>;

  return (
    <section className="p-6 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">{property.name}</h1>
      <p className="text-gray-500 mb-4">
        {property.type?.toUpperCase()} • {property.purpose?.toUpperCase()}
      </p>

      {/* Image Gallery */}
      {property.image?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {property.image.map((img: string, idx: number) => (
            <img
              key={idx}
              src={`${API_BASE_IMAGE_URL}${img}`}
              alt={`${API_BASE_IMAGE_URL}${img}`}
              className="w-full h-52 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Property Details</h2>
          <ul className="text-sm space-y-1">
            <li><strong>Price:</strong> AED {property.base_price}</li>
            <li><strong>Beds:</strong> {property.beds}</li>
            <li><strong>Baths:</strong> {property.baths}</li>
            <li><strong>Sqft:</strong> {property.sqft}</li>
            <li><strong>Location:</strong> {property.location}</li>
            <li><strong>Furnished:</strong> {property.furnished === "true" ? "Yes" : "No"}</li>
            <li><strong>Available From:</strong> {property.availablefrom}</li>
            <li><strong>Added Date:</strong> {property.addedDate}</li>
            <li><strong>Status:</strong> {property.status}</li>
            <li><strong>Visibility:</strong> {property.visibility}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Meta Information</h2>
          <ul className="text-sm space-y-1">
            <li><strong>Owner:</strong> {property.owner_name}</li>
            <li><strong>Agent:</strong> {property.agent_name}</li>
            <li><strong>Building:</strong> {property.buildingName}</li>
            <li><strong>Floors:</strong> {property.floors}</li>
            <li><strong>Year of Completion:</strong> {property.yearofcompletion}</li>
            <li><strong>Permit No:</strong> {property.permitNo}</li>
            <li><strong>DED:</strong> {property.DED}</li>
            <li><strong>RERA:</strong> {property.RERA}</li>
            <li><strong>BRN:</strong> {property.BRN}</li>
            <li><strong>Ref ID:</strong> {property.RefId}</li>
          </ul>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {(property.amenities || []).map((a: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full">
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      {property.description && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{property.description}</p>
        </div>
      )}

      {/* QR Code (if any) */}
      {property.QRcode && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">QR Code</h2>
          <img
            src={`${API_BASE_IMAGE_URL}${property.QRcode}`}
            alt={`${API_BASE_IMAGE_URL}${property.QRcode}`}
            className="w-32 h-32 object-contain border rounded"
          />
        </div>
      )}
    </section>
  );
}
