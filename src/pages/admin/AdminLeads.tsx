import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../lib/api";
import DeleteModal from "./DeleteModal";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [leadHistory, setLeadHistory] = useState<any[]>([]);
  const [activeLeadName, setActiveLeadName] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

const fetchLeadHistory = async (leadId: string) => {
  const res = await fetch(`${API_BASE_URL}/leads/${leadId}/remarks`);
  if (res.ok) {
    const data = await res.json();
    const lead = leads.find(l => l._id === leadId);
    setLeadHistory(data.history || []);
    setActiveLeadName(lead?.name || "Lead");
    setShowHistoryModal(true);
  } else {
    alert("Failed to fetch history.");
  }
};


  const fetchLeads = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/leads`);
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try{
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        setShowModal(false);
      } else {
        alert("Failed to delete lead.");
      }
    }catch(err){
      console.error(err);
    }finally{
      setShowModal(false);
    }

  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leads</h1>
        <Link to="/admin/leads/new" className="rounded bg-emerald-700 px-3 py-2 text-sm text-white">
          Add Lead
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm ">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Budget</th>
              <th>Stage</th>
              <th>Source</th>
              <th>Agent</th>
              <th>Action</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-400">Loading leads...</td>
              </tr>
            )}

            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-400">No leads found.</td>
              </tr>
            )}

            {!loading && leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>
                  {lead.budget_min && lead.budget_max
                    ? `AED ${lead.budget_min} - ${lead.budget_max}`
                    : "—"}
                </td>
                <td>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs capitalize">{lead.stage}</span>
                </td>
                <td>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs capitalize">{lead.source}</span>
                </td>
                <td>
                  {lead.assigned_to ? lead.assigned_to.name || "Agent" : <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="text-right">
                  <Link to={`/admin/leads/edit/${lead._id}`} className="rounded bg-blue-700 px-3 py-2 m-2 text-sm text-white">Edit</Link>
                  <button
    onClick={() => fetchLeadHistory(lead._id)}
    className="rounded bg-emerald-700 px-3 py-2 m-2 text-sm text-white"
  >
    View History
  </button>
  <button
                onClick={() => {
                  setSelectedId(lead._id);
                  setShowModal(true);
                }}
                className="text-red-700"
              >
                Delete
              </button>
  {/* <button onClick={() => deleteLead(lead._id)} className="rounded bg-red-700 px-3 py-2 m-2 text-sm text-white">Delete</button> */}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showHistoryModal && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
      <button
        onClick={() => setShowHistoryModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold mb-4">History for {activeLeadName}</h2>

      <div className="max-h-80 overflow-y-auto space-y-4">
        {leadHistory.length === 0 ? (
          <p className="text-gray-400">No history available.</p>
        ) : (
          leadHistory.map((item, idx) => (
            <div key={idx} className="bg-gray-100 rounded p-3">
              <p className="text-sm font-medium">{item.type.toUpperCase()}</p>
              <p className="text-sm text-gray-700">{item.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                By {item.added_by?.name || "Unknown"} on {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)}

<DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(selectedId)}
        title="Delete Lead"
        message="Are you sure you want to delete this lead?"
      />

    </section>
  );
}
