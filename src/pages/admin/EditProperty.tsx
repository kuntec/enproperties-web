import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { UploadCloud, X, Plus } from "lucide-react";
import { API_BASE_URL, getAuthHeaders, getImageUrl } from "../../lib/api";
import { toast } from 'sonner';



//const API_BASE = "http://localhost:3001"; // change this to match your backend

type FormValues = {
  owner_name?: string;
  agent_name?: string;
  name: string;
  description?: string;
  type?: string;
  purpose?: string;
  amenitiesInput?: string;
  beds?: number | string;
  baths?: number | string;
  sqft?: number | string;
  location?: string;
  furnished?: string;
  mapLink?: string;
  availablefrom?: string;
  addedDate?: string;
  buildingName?: string;
  yearofcompletion?: number | string;
  floors?: number | string;
  permitNo?: string;
  DED?: string;
  RERA?: string;
  BRN?: string;
  RefId?: string;
  visibility?: string;
  base_price?: number | string;
  status?: string;
  image?: FileList;
  QRcode?: FileList;
};

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingQR, setExistingQR] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setAmenities(data.amenities || []);
        setExistingImages(data.image || []);
        setExistingQR(data.QRcode || null);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
      });
  }, [id, reset]);

  const addAmenity = () => {
    const v = amenityInput.trim();
    if (!v) return;
    setAmenities((prev) => Array.from(new Set([...prev, v])));
    setAmenityInput("");
  };
  const removeAmenity = (tag: string) => {
    setAmenities((prev) => prev.filter((t) => t !== tag));
  };

  const onSubmit = async (values: FormValues) => {
    const fd = new FormData();

    const appendField = (key: keyof FormValues, val?: any) => {
      if (val === undefined || val === null || val === "") return;
      fd.append(key, String(val));
    };

    for (const key of Object.keys(values) as (keyof FormValues)[]) {
      if (key !== "image" && key !== "QRcode" && key !== "amenitiesInput") {
        appendField(key, values[key]);
      }
    }

    if (amenities.length) fd.append("amenities", amenities.join(","));
    else if (values.amenitiesInput) fd.append("amenities", values.amenitiesInput.trim());

    if (values.image) {
      Array.from(values.image).forEach((img) => fd.append("image", img));
    }
    if (values.QRcode?.[0]) {
      fd.append("QRcode", values.QRcode[0]);
    }

    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(`Failed to update: ${res.status}\n${err.message || ""}`); // ✅ Success toast
      return;
    }

    toast.success("Property updated successfully!"); // ✅ Success toast
    navigate(`/admin/properties`);
  };

  return (
    <section className="p-6">
    <h1 className="text-xl font-bold mb-4">Edit Property</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* Property Title & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Property Title</label>
          <input {...register("name", { required: true })} placeholder="Property Title" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Location</label>
          <input {...register("location")} placeholder="Location" className="border px-3 py-2 rounded w-full" />
        </div>
      </div>
  
      {/* Price, Beds, Baths, Sq Ft */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Price (AED)</label>
          <input {...register("base_price")} placeholder="Price" type="number" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Beds</label>
          <input {...register("beds")} placeholder="Beds" type="number" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Baths</label>
          <input {...register("baths")} placeholder="Baths" type="number" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Area (sq ft)</label>
          <input {...register("sqft")} placeholder="Area" type="number" className="border px-3 py-2 rounded w-full" />
        </div>
      </div>
  
      {/* Description & Google Map URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <textarea {...register("description")} rows={4} placeholder="Description" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Google Map URL</label>
          <textarea {...register("mapLink")} placeholder="Google Map URL" className="border px-3 py-2 rounded w-full" />
        </div>
      </div>
  
      {/* Amenity Manager */}
      <div>
        <label className="font-medium text-sm">Amenities</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }}
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter amenity & press Enter"
          />
          <button type="button" onClick={addAmenity} className="bg-emerald-700 text-white px-3 py-2 rounded text-sm flex items-center gap-1">
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {amenities.map((a) => (
            <span key={a} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {a}
              <button onClick={() => removeAmenity(a)} className="hover:text-red-600">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>
  
      {/* Existing Images */}
      {!!existingImages.length && (
        <div>
          <p className="text-sm font-medium mb-1">Existing Images:</p>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img, i) => (
              <img key={i} src={getImageUrl(img)} alt="img" className="w-24 h-24 object-cover rounded border" />
            ))}
          </div>
        </div>
      )}
  
      {/* Upload New Images */}
      <div>
        <label className="text-sm font-medium mb-1 block">Upload New Images</label>
        <input type="file" multiple accept="image/*" {...register("image")} className="block mt-1" />
      </div>
  
      {/* QR Code */}
      {existingQR && (
        <div>
          <label className="text-sm font-medium mb-1 block">Current QR Code</label><br />
          <img src={getImageUrl(existingQR)} alt="qr" className="w-24 h-24 object-contain mt-1 border rounded" />
        </div>
      )}
  
      <div>
        <label className="text-sm font-medium mb-1 block">Upload New QR Code</label>
        <input type="file" accept="image/*" {...register("QRcode")} className="block mt-1" />
      </div>
  
      {/* Submit Button */}
      <button type="submit" className="bg-emerald-700 text-white px-6 py-2 rounded" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Property"}
      </button>
    </form>
  </section>
  
  );
}
