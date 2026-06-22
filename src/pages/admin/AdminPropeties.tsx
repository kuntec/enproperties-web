import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders, getImageUrl } from '../../lib/api';
import DeleteModal from "./DeleteModal";


type Property = {
  _id: string;
  name: string;
  type: string;
  image:string;
  base_price: number;
  beds: number;
  agent_name?: string;
  status: string;
};

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);


  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/properties?page=${page}&limit=10&includeAll=true`, {
        headers: getAuthHeaders(),
      });
      setProperties(res.data.properties);
      setTotalPages(res.data.totalPages);
      
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/properties/${id}`, { headers: getAuthHeaders() });
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }finally {
      setShowModal(false);
    }
    
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Properties</h1>
        <Link
          to="/admin/properties/new"
          className="rounded bg-emerald-700 px-3 py-2 text-sm text-white"
        >
          Add Property
        </Link>
      </div>
     
      {/* <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Title</th>
              <th>Type</th>
              <th>Price (AED)</th>
              <th>Beds</th>
              <th>Agent</th>
              <th>Status</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No properties found.
                </td>
              </tr>
            ) : (
              properties.map((prop) => (
                <tr key={prop._id} className="border-t hover:bg-gray-50">
                   <td className="p-3 flex items-center gap-2">
        {prop.image?.[0] && (
          <img
            src={getImageUrl(prop.image[0])}
            alt={prop.image[0]}
            className="h-10 w-14 object-cover rounded"
          />
        )}
        <span>{prop.name}</span>
      </td>
                  <td className="p-3">{prop.name || "—"}</td>
                  <td>{prop.type || "—"}</td>
                  <td>{prop.base_price?.toLocaleString() || "—"}</td>
                  <td>{prop.beds ?? "—"}</td>
                  <td>{prop.agent_name || "—"}</td>
                  <td>{prop.status || "—"}</td>
                  <td className="space-x-2">
                  <Link to={`/admin/properties/${prop._id}`}>View</Link>

                    <Link
                      to={`/admin/properties/edit/${prop._id}`}
                      className="text-emerald-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                    onClick={() => {
                      setSelectedPropertyId(prop._id);
                      setShowModal(true);
                    }}
                    className="text-red-700"
                  >
                    Delete
                  </button>
                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> */}

{/* 
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {loading ? (
    <div className="col-span-full text-center py-8">Loading...</div>
  ) : properties.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-8">
      No properties found.
    </div>
  ) : (
    properties.map((prop) => (
      <div
        key={prop._id}
        className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
      >
       
        {prop.image?.[0] && (
          <img
            src={`${API_BASE_IMAGE_URL}${prop.image[0]}`}
            alt={prop.name}
            className="h-40 w-full object-cover rounded-md mb-3"
          />
        )}

       
        <h2 className="text-lg font-semibold mb-1">{prop.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Type: {prop.type}</p>
        <p className="text-sm text-gray-600 mb-1">Price: AED {prop.base_price?.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mb-1">Beds: {prop.beds ?? "—"}</p>
        <p className="text-sm text-gray-600 mb-1">Agent: {prop.agent_name || "—"}</p>
        <p className="text-sm text-gray-600 mb-3">Status: {prop.status}</p>

       
        <div className="flex justify-between items-center text-sm">
          <Link
            to={`/admin/properties/${prop._id}`}
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
          <Link
            to={`/admin/properties/edit/${prop._id}`}
            className="text-emerald-700 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              setSelectedPropertyId(prop._id);
              setShowModal(true);
            }}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div> */}


{/* 📱 Mobile View: Grid */}
<div className="sm:hidden grid gap-4">
  {loading ? (
    <div className="col-span-full text-center py-8">Loading...</div>
  ) : properties.length === 0 ? (
    <div className="col-span-full text-center text-gray-500 py-8">
      No properties found.
    </div>
  ) : (
    properties.map((prop) => (
      <div
        key={prop._id}
        className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
      >
        {prop.image?.[0] && (
          <img
            src={getImageUrl(prop.image[0])}
            alt={prop.name}
            className="h-40 w-full object-cover rounded-md mb-3"
          />
        )}
        <h2 className="text-lg font-semibold mb-1">{prop.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Type: {prop.type}</p>
        <p className="text-sm text-gray-600 mb-1">Price: AED {prop.base_price?.toLocaleString()}</p>
        <p className="text-sm text-gray-600 mb-1">Beds: {prop.beds ?? "—"}</p>
        <p className="text-sm text-gray-600 mb-1">Agent: {prop.agent_name || "—"}</p>
        <p className="text-sm text-gray-600 mb-3">Status: {prop.status}</p>
        <div className="flex justify-between items-center text-sm">
          <Link to={`/admin/properties/${prop._id}`} className="text-blue-600 hover:underline">View</Link>
          <Link to={`/admin/properties/edit/${prop._id}`} className="text-emerald-700 hover:underline">Edit</Link>
          <button
            onClick={() => {
              setSelectedPropertyId(prop._id);
              setShowModal(true);
            }}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>

{/* 🖥️ Desktop View: Table */}
<div className="hidden sm:block overflow-x-auto rounded-lg border bg-white">
  <table className="min-w-full text-sm whitespace-nowrap">
    <thead className="bg-gray-50 text-left text-gray-600">
      <tr>
        <th className="p-3">Title</th>
        <th>Type</th>
        <th>Price (AED)</th>
        <th>Beds</th>
        <th>Agent</th>
        <th>Status</th>
        <th className="w-24"></th>
      </tr>
    </thead>
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={7} className="p-4 text-center">Loading...</td>
        </tr>
      ) : properties.length === 0 ? (
        <tr>
          <td colSpan={7} className="p-4 text-center text-gray-500">No properties found.</td>
        </tr>
      ) : (
        properties.map((prop) => (
          <tr key={prop._id} className="border-t hover:bg-gray-50">
            <td className="p-3 flex items-center gap-2">
              {prop.image?.[0] && (
                <img
                  src={getImageUrl(prop.image[0])}
                  alt={prop.name}
                  className="h-10 w-14 object-cover rounded"
                />
              )}
              <span>{prop.name}</span>
            </td>
            <td>{prop.type || "—"}</td>
            <td>{prop.base_price?.toLocaleString() || "—"}</td>
            <td>{prop.beds ?? "—"}</td>
            <td>{prop.agent_name || "—"}</td>
            <td>{prop.status || "—"}</td>
            <td className="space-x-2">
              <Link to={`/admin/properties/${prop._id}`} className="text-blue-600 hover:underline">View</Link>
              <Link to={`/admin/properties/edit/${prop._id}`} className="text-emerald-700 hover:underline">Edit</Link>
              <button
                onClick={() => {
                  setSelectedPropertyId(prop._id);
                  setShowModal(true);
                }}
                className="text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>




      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded border px-3 py-1 text-sm"
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="px-4 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="rounded border px-3 py-1 text-sm"
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedPropertyId)}
        title="Delete Property"
        message="Are you sure you want to delete this property?"
      />
    </section>
  );
}
