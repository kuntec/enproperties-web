import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../lib/api";
import { toast } from 'sonner';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Example icons

export default function AddAgent() {

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((prev) => !prev);

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNo: "",
    experience: "",
    bio: "",
    status: "active",
    password:"",
    confirmPassword:"",
    image: null as File | null,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        fd.append(key, value as any);
      }
    });

    try {
      const res = await fetch(`${API_BASE_URL}/agents`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to add agent");

      toast.success("Agent added successfully!"); // ✅ Success toast
      navigate("/admin/agents");
    } catch (err) {
      console.error(err);
      alert("Error adding agent");
    }
  };

  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold">Add New Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div>
    <label className="block text-sm font-medium">Password</label>
    <div className="relative">
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        className="mt-1 w-full rounded border px-3 py-2 pr-10"
      />
      <span
        onClick={handleToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
      </span>
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium">Confirm Password</label>
    <input
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="mt-1 w-full rounded border px-3 py-2"
    />
  </div>
</div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">License No</label>
            <input
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Experience</label>
            <input
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 w-full rounded border px-3 py-2"
            rows={4}
          />
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
          <label className="block text-sm font-medium">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-emerald-700 px-4 py-2 text-white"
        >
          Save Agent
        </button>
      </form>
    </section>
  );
}
