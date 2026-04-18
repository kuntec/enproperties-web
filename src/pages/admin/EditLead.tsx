import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api"; // adjust the path
import { toast } from 'sonner';

interface Agent {
  _id: string;
  name: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  stage: string;
  budget_min?: number;
  budget_max?: number;
  preferred_type?: string;
  preferred_location?: string;
  notes?: string;
  assigned_to?: string;
}

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch current lead
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`);
      const data = await res.json();
      setLead(data);
      setLoading(false);
    };

    const fetchAgents = async () => {
      const res = await fetch(`${API_BASE_URL}/agents`);
      const data = await res.json();
      setAgents(data.agents || []);
    };

    fetchData();
    fetchAgents();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!lead) return;
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      toast.success("Lead update successfully!"); // ✅ Success toast
      navigate("/admin/leads");
    } catch (err) {
      console.error(err);
      alert("Error updating lead");
    }
  };

  if (loading || !lead) return <p>Loading...</p>;

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Lead</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={lead.name} onChange={handleChange} className="w-full rounded border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={lead.email} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={lead.phone} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Stage</label>
            <select name="stage" value={lead.stage} onChange={handleChange} className="w-full rounded border px-3 py-2">
              {["new", "contacted", "visit_scheduled", "negotiation", "won", "lost"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Source</label>
            <select name="source" value={lead.source} onChange={handleChange} className="w-full rounded border px-3 py-2">
              {["website", "whatsapp", "phone", "email", "portal", "referral", "import"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Budget Min</label>
            <input type="number" name="budget_min" value={lead.budget_min || ""} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Budget Max</label>
            <input type="number" name="budget_max" value={lead.budget_max || ""} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Property Type</label>
            <select name="preferred_type" value={lead.preferred_type || ""} onChange={handleChange} className="w-full rounded border px-3 py-2">
              <option value="">Select</option>
              {["apartment", "villa", "townhouse", "penthouse", "plot", "commercial"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred Location</label>
            <input name="preferred_location" value={lead.preferred_location || ""} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Assign to Agent</label>
          <select name="assigned_to" value={lead.assigned_to || ""} onChange={handleChange} className="w-full rounded border px-3 py-2">
            <option value="">-- Select Agent --</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea name="notes" value={lead.notes || ""} onChange={handleChange} rows={4} className="w-full rounded border px-3 py-2" />
        </div>

        <button type="submit" className="rounded bg-emerald-700 px-4 py-2 text-white">
          Update Lead
        </button>
      </form>
    </section>
  );
}
