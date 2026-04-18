import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../lib/api";
import DeleteModal from "./DeleteModal";
import axios from "axios";

interface Agent {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  licenseNo?: string;
  experience?: string;
  image?: string;
  status?: string;
}



// const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function AdminAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/agents/${id}`);
      setAgents((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setShowModal(false);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/agents`)
      .then((res) => res.json())
      .then((data) => setAgents(data.agents || []));
  }, []);


  const deleteAgent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
  
    try {
      const res = await fetch(`${API_BASE_URL}/agents/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete");
  
      alert("Agent deleted");
      // optionally refresh the agent list
      setAgents((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting agent");
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Agents</h1>
        <Link
          to="/admin/agents/new"
          className="rounded bg-emerald-700 px-3 py-2 text-sm text-white"
        >
          Add Agent
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="p-3">Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="border-t">
                <td className="p-3">
                  {agent.image ? (
                    <img
                      src={`${API_BASE_IMAGE_URL}/${agent.image}`}
                      alt={agent.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                  )}
                </td>
                <td>{agent.name}</td>
                <td>{agent.email || "—"}</td>
                <td>{agent.phone || "—"}</td>
                <td>{agent.status}</td>
                <td>
                  <Link to={`/admin/agents/edit/${agent._id}`} className="text-emerald-700">
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedId(agent._id);
                      setShowModal(true);
                    }}
                    className="text-red-700 m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <DeleteModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={() => handleDelete(selectedId)}
              title="Delete Agent"
              message="Are you sure you want to delete this agent?"
            />
    </section>
  );
}
