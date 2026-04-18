import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../lib/api";

const PROPERTY_TYPES = ["apartment", "villa", "townhouse", "penthouse", "plot", "commercial"];
const PURPOSES = ["buy", "rent"];
const OFF_PLAN = ["yes", "no"];
const PORTALS = ["Bayut", "dubizzle"];
const STATUS = ["active", "inactive"];
const VISIBILITY = ["public", "private", "draft"];

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    name: "",
    title_ar: "",
    description: "",
    description_ar: "",
    type: "apartment",
    purpose: "buy",
    status: "active",
    visibility: "public",
    base_price: "",
    final_price: "",
    city: "",
    locality: "",
    map_iframe: "",
    qrCode: null,
    images: [],
    videos: [],
    off_plan: "no",
    off_plan_details_ar: "",
    off_plan_details_en: "",
    handover_date: "",
    amenities: "",
    portals: [],
    beds: "",
    baths: "",
    sqft: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any, field: string) => {
    const files = e.target.files;
    setFormData((prev) => ({
      ...prev,
      [field]: field === "qrCode" ? files[0] : [...files],
    }));
  };

  const handlePortalsChange = (e: any) => {
    const selected = Array.from(e.target.selectedOptions).map((o: any) => o.value);
    setFormData((prev) => ({ ...prev, portals: selected }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === "qrCode" && value) {
        form.append("qrCode", value);
      } else if (key === "images") {
        value.forEach((file: any) => form.append("image[]", file));
      } else if (key === "videos") {
        value.forEach((file: any) => form.append("videos[]", file));
      } else if (key === "portals") {
        value.forEach((portal: string) => form.append("portals[]", portal));
      } else {
        form.append(key, value);
      }
    });

    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      alert("✅ Property created successfully.");
      navigate("/admin/properties");
    } else {
      alert("❌ Error saving property.");
    }
  };

  const renderInput = (label: string, name: string, type: string = "text") => (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={(formData as any)[name]}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );

  const renderSelect = (label: string, name: string, options: string[], multiple = false) => (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={(formData as any)[name]}
        onChange={multiple ? handlePortalsChange : handleChange}
        multiple={multiple}
        className="w-full border rounded px-3 py-2"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderFile = (label: string, name: string, multiple = false) => (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="file"
        multiple={multiple}
        onChange={(e) => handleFileChange(e, name)}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {renderInput("Name", "name")}
        {renderInput("Arabic Title", "title_ar")}
        {renderInput("Description", "description")}
        {renderInput("Arabic Description", "description_ar")}
        {renderInput("City", "city")}
        {renderInput("Locality", "locality")}
        {renderInput("Map Iframe", "map_iframe")}
        {renderInput("Base Price", "base_price", "number")}
        {renderInput("Final Price", "final_price", "number")}
        {renderInput("Beds", "beds", "number")}
        {renderInput("Baths", "baths", "number")}
        {renderInput("Sqft", "sqft", "number")}
        {renderInput("Amenities (comma separated)", "amenities")}

        {renderSelect("Type", "type", PROPERTY_TYPES)}
        {renderSelect("Purpose", "purpose", PURPOSES)}
        {renderSelect("Status", "status", STATUS)}
        {renderSelect("Visibility", "visibility", VISIBILITY)}
        {renderSelect("Off Plan", "off_plan", OFF_PLAN)}
        {renderSelect("Portals", "portals", PORTALS, true)}

        {formData.off_plan === "yes" && (
          <>
            {renderInput("Off Plan Details EN", "off_plan_details_en")}
            {renderInput("Off Plan Details AR", "off_plan_details_ar")}
            {renderInput("Handover Date", "handover_date", "date")}
          </>
        )}

        {renderFile("QR Code", "qrCode")}
        {renderFile("Images", "images", true)}
        {renderFile("Videos", "videos", true)}

        <div className="col-span-2 text-right mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Submit Property
          </button>
        </div>
      </form>
    </div>
  );
}
