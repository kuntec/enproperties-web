import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/api";
import DeleteModal from "./DeleteModal";
import { toast } from "sonner";

export default function SellProperty() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);


  const fetchRequests = async () => {
    setLoading(true);
    try {
        console.log(`${API_BASE_URL}/sell`);
        const res = await fetch(`${API_BASE_URL}/sell`);
        const data = await res.json();
        console.log(data);
      setRequests(data || []);
    } catch (err) {
      console.error("Error fetching valuations:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/sell/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        setShowModal(false);
        toast.success("Valuation request deleted!");
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Valuation Requests</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Offering Type</th>
              <th>Property Address</th>
              <th>Preferred Date</th>
              <th>Preferred Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">Loading...</td>
              </tr>
            )}

            {!loading && requests.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">No requests found.</td>
              </tr>
            )}

            {!loading && requests.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{r.first_name} {r.last_name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.offering_type}</td>
                <td>{r.property_address}</td>
                <td>{r.preferred_date}</td>
                <td>{r.preferred_time}</td>
                <td>
                <button
                onClick={() => {
                  setSelectedPropertyId(r._id);
                  setShowModal(true);
                }}
                className="text-red-700"
              >
                Delete
              </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Custom Delete Dialog */}
       <DeleteModal
               isOpen={showModal}
               onClose={() => setShowModal(false)}
               onConfirm={() => deleteRequest(selectedPropertyId)}
               title="Delete Sell Property Request"
               message="Are you sure you want to delete this request?"
             />
    </div>
  );
}
