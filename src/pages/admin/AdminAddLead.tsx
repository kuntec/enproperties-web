import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api";
import { toast } from 'sonner';

type FormValues = {
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
};

export default function AdminAddLead() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>();
  const [agents, setAgents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/agents`)
      .then(res => res.json())
      .then(data => setAgents(data.agents || []));
  }, []);

  const onSubmit = async (values: FormValues) => {
    if (values.assigned_to === "") {
      values.assigned_to = null;
    }
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`Failed to save lead.\n${err.message || res.statusText}`);
      return;
    }

   //alert("Lead added successfully!");
   toast.success("Lead added successfully!"); // ✅ Success toast
    reset();
    navigate("/admin/leads");
  };

  return (
    <section className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">Add New Lead</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input {...register("name", { required: true })} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register("email")} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input {...register("phone")} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Lead Source</label>
            <select {...register("source")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
              {["website", "whatsapp", "phone", "email", "portal", "referral", "import"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Stage</label>
            <select {...register("stage")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
              {["new", "contacted", "visit_scheduled", "negotiation", "won", "lost"].map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Budget Min (AED)</label>
            <input type="number" {...register("budget_min")} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Budget Max (AED)</label>
            <input type="number" {...register("budget_max")} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Preferred Property Type</label>
            <select {...register("preferred_type")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
              {["apartment", "villa", "townhouse", "penthouse", "plot", "commercial"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Preferred Location</label>
            <input {...register("preferred_location")} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Assigned Agent</label>
          <select {...register("assigned_to")} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— Select —</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea rows={5} {...register("notes")} className="mt-1 w-full rounded border px-3 py-2" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="rounded bg-emerald-700 px-4 py-2 text-white disabled:opacity-60">
            {isSubmitting ? "Saving…" : "Save Lead"}
          </button>
          <button type="button" onClick={() => reset()} className="rounded border px-4 py-2">
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
