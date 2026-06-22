import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getAuthHeaders } from "../../lib/api";
import { toast } from "sonner";

export default function AgentLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [transferEmail, setTransferEmail] = useState("");

  const [myLeads, setMyLeads] = useState<any[]>([]);
  const [unassignedLeads, setUnassignedLeads] = useState<any[]>([]);

  
  const userStr = localStorage.getItem("user");


const [remarkModal, setRemarkModal] = useState(false);
const [remarks, setRemarks] = useState<any[]>([]);
const [newRemark, setNewRemark] = useState("");
const [activeLeadId, setActiveLeadId] = useState<string | null>(null);

const fetchRemarks = async (leadId: string) => {
  const res = await fetch(`${API_BASE_URL}/leads/${leadId}/remarks`, { headers: getAuthHeaders() });
  const data = await res.json();
  setRemarks(data.history || []);
  setActiveLeadId(leadId);
  setRemarkModal(true);
};

const handleAddRemark = async () => {
  if (!newRemark || !activeLeadId) return;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("Added by " + user?.id);  
  const res = await fetch(`${API_BASE_URL}/leads/${activeLeadId}/remarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ message: newRemark, added_by: user?.id }),
  });

  if (res.ok) {
    const data = await res.json();
    setRemarks(data.history);
    setNewRemark("");
    setRemarkModal(false);
    toast.success("Remark added successfully!");

  } else {
    alert("Failed to add remark");
  }
};


  const agentId = userStr ? JSON.parse(userStr).agent._id : null;
  const userId = userStr ? JSON.parse(userStr).id : null;

  //console.log("Agent ID:", agentId);
  //console.log("User ID:", userId);

  // const fetchLeads = async () => {
  //   setLoading(true);
  //   console.log(`${API_BASE_URL}/leads/agent/${agentId}`);
  //   const res = await fetch(`${API_BASE_URL}/leads/agent/${agentId}`);
  //   //const res = await fetch(`${API_BASE_URL}/leads`);
  //   const data = await res.json();
  //   console.log(data);
  //   setLeads(data.leads || []);
  //   setLoading(false);
  // };

  const fetchLeads = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/leads/agent/${agentId}`, { headers: getAuthHeaders() });
    const data = await res.json();
    setMyLeads(data.myLeads || []);
    setUnassignedLeads(data.unassignedLeads || []);
    setLoading(false);
  };

  const handleTakeLead = async (leadId: string) => {
    const res = await fetch(`${API_BASE_URL}/leads/${leadId}/take`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ agentId }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert("Lead successfully taken!");
      fetchLeads(); // Refresh both tables
    } else {
      alert(data.message || "Failed to take lead.");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    const res = await fetch(`${API_BASE_URL}/leads/${id}`, { method: "DELETE", headers: getAuthHeaders() });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l._id !== id));
    } else {
      alert("Failed to delete lead.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);


  const handleTransferLead = async (leadId: string) => {
    if (!transferEmail) return alert("Please enter an agent email");
  
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${leadId}/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ agent_email: transferEmail }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Lead transferred successfully!");
        setShowModal(false);
        fetchLeads(); // Refresh lead list
      } else {
        alert(data.message || "Failed to transfer lead.");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      alert("Something went wrong.");
    }
  };
  

  return (
    <section>
<h2 className="text-lg font-semibold mb-2">🟡 New Unassigned Leads</h2>
<div className="overflow-hidden rounded-lg border bg-white mb-10">
<table className="w-full text-sm">
<thead className="bg-gray-50 text-left text-gray-600">
<tr>
        <th className="p-3">Name</th>
       
        <th>Budget</th>
        <th>Stage</th>
        <th>Source</th>
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

      {!loading && unassignedLeads.length === 0 && (
        <tr>
          <td colSpan={8} className="p-4 text-center text-gray-400">No unassigned leads.</td>
        </tr>
      )}

      {!loading && unassignedLeads.map((lead) => (
        <tr key={lead._id} className="border-t hover:bg-gray-50">
          <td className="p-3 font-medium">{lead.name}</td>
         
          <td>{lead.budget_min && lead.budget_max ? `AED ${lead.budget_min} - ${lead.budget_max}` : "—"}</td>
          <td>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs capitalize">{lead.stage}</span>
          </td>
          <td>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs capitalize">{lead.source}</span>
          </td>
          <td>
            <button
              onClick={() => handleTakeLead(lead._id)}
              className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
            >
              Take Lead
            </button>
          </td>
          <td></td>
        </tr>
      ))}
    </tbody>
</table>
</div>

{/* ✅ My Leads Section */}
<h2 className="text-xl font-semibold mb-4">✅ My Leads</h2>
<div className="overflow-hidden rounded-lg border bg-white">
  <table className="w-full text-sm">
    <thead className="bg-gray-50 text-left text-gray-600">
      <tr>
        <th className="p-3">Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Budget</th>
        <th>Stage</th>
        <th>Source</th>
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

      {!loading && myLeads.length === 0 && (
        <tr>
          <td colSpan={8} className="p-4 text-center text-gray-400">No assigned leads.</td>
        </tr>
      )}

      {!loading && myLeads.map((lead) => (
        <tr key={lead._id} className="border-t hover:bg-gray-50">
          <td className="p-3 font-medium">{lead.name}</td>
          <td>{lead.email}</td>
          <td>{lead.phone}</td>
          <td>{lead.budget_min && lead.budget_max ? `AED ${lead.budget_min} - ${lead.budget_max}` : "—"}</td>
          <td>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs capitalize">{lead.stage}</span>
          </td>
          <td>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs capitalize">{lead.source}</span>
          </td>
          <td>
           

            <button
  className="rounded bg-emerald-700 px-3 py-2 text-sm text-white"
  onClick={() => fetchRemarks(lead._id)}
>
  View/Add Remarks
</button>

<button
              className="rounded bg-red-700 px-3 py-2 m-2 text-sm text-white"
              onClick={() => {
                setSelectedLead(lead);
                setTransferEmail("");
                setShowModal(true);
              }}
            >
              Transfer
            </button>
          </td>
          <td></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leads</h1>
       
      </div> */}

      {/* <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Budget</th>
              <th>Stage</th>
              <th>Source</th>
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
                  <button  className="rounded bg-emerald-700 px-3 py-2 text-sm text-white">Add Remark</button>
  <button
//    className="text-red-600 hover:underline"
    className="rounded bg-red-700 px-3 py-2 m-2 text-sm text-white"
    onClick={() => {
      setSelectedLead(lead);
      setTransferEmail("");
      setShowModal(true);
    }}
  >
    Transfer
  </button>
</td>

                <td>
                  {lead.assigned_to ? lead.assigned_to.name || "Agent" : <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="text-right">
                  <Link to={`/admin/leads/edit/${lead._id}`} className="text-blue-600 mr-2">Edit</Link>
                  <button onClick={() => deleteLead(lead._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {showModal && selectedLead && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold mb-4">Lead Details</h2>
      <p><strong>Name:</strong> {selectedLead.name}</p>
      <p><strong>Email:</strong> {selectedLead.email}</p>
      <p><strong>Phone:</strong> {selectedLead.phone}</p>
      <p><strong>Budget:</strong> AED {selectedLead.budget_min} - {selectedLead.budget_max}</p>
      <p><strong>Preferred Type:</strong> {selectedLead.preferred_type}</p>
      <p><strong>Preferred Location:</strong> {selectedLead.preferred_location}</p>
      <p><strong>Stage:</strong> {selectedLead.stage}</p>
      <p><strong>Source:</strong> {selectedLead.source}</p>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Transfer to Agent (by Email)</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          placeholder="agent@example.com"
          value={transferEmail}
          onChange={(e) => setTransferEmail(e.target.value)}
        />
        <button
          onClick={() => handleTransferLead(selectedLead._id)}
          className="mt-3 w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800"
        >
          Transfer Lead
        </button>
      </div>
    </div>
  </div>
)}


{remarkModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button
        onClick={() => setRemarkModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        ×
      </button>

      <h2 className="text-xl font-semibold mb-4">Lead Remarks</h2>

      <div className="max-h-40 overflow-y-auto space-y-3 mb-4">
        {remarks.map((remark, index) => (
          <div key={index} className="bg-gray-100 rounded px-3 py-2 text-sm">
            <p>{remark.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {remark.added_by?.name || "Agent"} - {new Date(remark.created_at).toLocaleString()}
            </p>
          </div>
        ))}
        {remarks.length === 0 && <p className="text-gray-400 text-sm">No remarks yet.</p>}
      </div>

      <textarea
        rows={3}
        placeholder="Add a remark..."
        className="w-full border px-3 py-2 rounded text-sm"
        value={newRemark}
        onChange={(e) => setNewRemark(e.target.value)}
      />
      <button
        onClick={handleAddRemark}
        className="mt-3 w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800 text-sm"
      >
        Save Remark
      </button>
    </div>
  </div>
)}


    </section>



  );
}
