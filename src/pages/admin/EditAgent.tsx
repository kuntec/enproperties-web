import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders, getImageUrl } from "../../lib/api";
import { toast } from 'sonner';

export default function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNo: "",
    experience: "",
    status: "active",
    image: undefined as File | undefined,
    imagePreview: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/agents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          licenseNo: data.licenseNo || "",
          experience: data.experience || "",
          status: data.status || "active",
          imagePreview: data.image ? getImageUrl(data.image) : "",
        }));
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("licenseNo", formData.licenseNo);
    fd.append("experience", formData.experience);
    fd.append("status", formData.status);
    if (formData.image) {
      fd.append("image", formData.image);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/agents/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to update agent");
      toast.success("Agent update successfully!"); // ✅ Success toast

      navigate("/admin/agents");
    } catch (err) {
      console.error(err);
      alert("Error updating agent.");
    }
  };

  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Edit Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">License No</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
          {formData.imagePreview && (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className="mt-3 h-20 w-20 rounded-full object-cover"
            />
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="rounded bg-emerald-700 px-4 py-2 text-white"
          >
            Update Agent
          </button>
        </div>
      </form>
    </section>
  );
}
