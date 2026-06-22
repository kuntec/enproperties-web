import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { X, UploadCloud, Plus } from "lucide-react";

type FormValues = {
  owner_name?: string;
  agent: string;
  agent_name?: string;
  agent_phone?: string;
  agent_email?: string;
  name: string;
  description?: string;
  type?: string;        // apartment | villa | ...
  purpose?: string;     // buy | rent
  amenitiesInput?: string; // UI-only (comma or tags)
  beds?: number | string;
  baths?: number | string;
  sqft?: number | string;
  plotArea?: number | string;
  location?: string;
  furnished?: string;   // "true" | "false"
  off_plan?: string; // "YES" | "NO"
  portals?: string;
  mapLink?: string;
  availablefrom?: string; // date
  addedDate?: string;     // date
  buildingName?: string;
  yearofcompletion?: number | string;
  floors?: number | string;
  permitNo?: string;
  DED?: string;
  RERA?: string;
  BRN?: string;
  RefId?: string;
  visibility?: string;   // public | private | draft...
  base_price?: number | string;
  rent_frequency?: string;
  status?: string;       // active | inactive ...
  image?: FileList;      // multiple
  QRcode?: FileList;     // single
  city: string;
  locality: string;
  sub_locality: string;
  tower_name: string;
  off_plan_details_sale_type: string;
  off_plan_details_ddl_waiver: string;
  off_plan_details_original_price: string;
  off_plan_details_amount_paid : string;
};
import { API_BASE_URL, getAuthHeaders } from '../../lib/api';

const API_URL = `${API_BASE_URL}/properties`; // <-- change to match your route

export default function AddPropertyForm() {

  const [agents, setAgents] = useState<any[]>([]);


  



  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      type: "Apartment",
      purpose: "Buy",
      furnished: "No",
      visibility: "Public",
      status: "Available",
    },
  });

  const allFields = watch(); // all fields watch 

  const selectedAgentId = watch("agent");
  
  useEffect(() => {
    if (selectedAgentId) {
      const selectedAgent = agents.find((a) => a._id === selectedAgentId);
      if (selectedAgent) {
        setValue("agent_name", selectedAgent.name);
        setValue("agent_phone", selectedAgent.phone);
        setValue("agent_email", selectedAgent.email);
      }
    } else {
      // Clear fields if none selected
      setValue("agent_name", "");
      setValue("agent_phone", "");
      setValue("agent_email", "");
    }
      fetch(`${API_BASE_URL}/agents`)
        .then(res => res.json())
        .then(data => setAgents(data.agents || []));
    }, [selectedAgentId]);

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");

  const [selectedPortals, setSelectedPortals] = useState<string[]>(["Bayut"]);

  const togglePortal = (value: string) => {
    setSelectedPortals((prev) =>
      prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value]
    );
  };

  const images = watch("image");
  const qrcode = watch("QRcode");

  const imageNames = useMemo(
    () => (images?.length ? Array.from(images).map((f) => f.name) : []),
    [images]
  );
  const qrcodeName = useMemo(
    () => (qrcode?.length ? qrcode[0].name : undefined),
    [qrcode]
  );

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

    // Text fields (matching your backend names)
    const push = (key: keyof FormValues, val?: any) => {
      if (val === undefined || val === null || val === "") return;
      fd.append(key as string, String(val));
    };

    push("owner_name", values.owner_name);
    push("agent", values.agent);
    push("agent_name", values.agent_name);
    push("agent_phone", values.agent_phone);
    push("agent_email", values.agent_email);
    push("name", values.name);
    push("description", values.description);
    push("type", values.type);
    push("purpose", values.purpose);
    push("beds", values.beds);
    push("baths", values.baths);
    push("sqft", values.sqft);
    push("plotArea", values.plotArea);
    push("portals", values.portals);
    push("location", values.location);
    push("furnished", values.furnished);
    push("mapLink", values.mapLink);
    push("availablefrom", values.availablefrom);
    push("addedDate", values.addedDate);
    push("buildingName", values.buildingName);
    push("yearofcompletion", values.yearofcompletion);
    push("floors", values.floors);
    push("permitNo", values.permitNo);
    push("DED", values.DED);
    push("RERA", values.RERA);
    push("BRN", values.BRN);
    push("RefId", values.RefId);
    push("visibility", values.visibility);
    push("base_price", values.base_price);
    push("rent_frequency", values.rent_frequency);
    push("status", values.status);
    push("city", values.city);
    push("locality", values.locality);
    push("sub_locality", values.sub_locality);
    push("tower_name", values.buildingName);
    push("off_plan_details_sale_type", values.off_plan_details_sale_type);
    push("off_plan_details_ddl_waiver", values.off_plan_details_ddl_waiver);
    push("off_plan_details_original_price", values.off_plan_details_original_price);
    push("off_plan_details_amount_paid", values.off_plan_details_amount_paid);

    // amenities: your API accepts array OR comma string — we’ll send CSV
    const csvAmenities =
      amenities.length
        ? amenities.join(",")
        : (values.amenitiesInput || "").trim();
    if (csvAmenities) fd.append("amenities", csvAmenities);

    // Files
    if (values.image && values.image.length) {
      const max = Math.min(values.image.length, 20);
      for (let i = 0; i < max; i++) {
        fd.append("image", values.image[i]); // field name must be "image"
      }
    }
    if (values.QRcode && values.QRcode[0]) {
      fd.append("QRcode", values.QRcode[0]); // field name must be "QRcode"
    }

    // Important: DO NOT set Content-Type; browser will set multipart boundary
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`Failed: ${res.status} ${res.statusText}\n${err.message || ""}`);
      return;
    }

    const data = await res.json();
    console.log("Created:", data);
    alert("Property added successfully!");
    reset();
    setAmenities([]);
    // optionally navigate to list page here
  };

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Add New Property</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: main fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Property Name/Title Name</label>
              <input {...register("owner_name")} className="mt-1 w-full rounded border px-3 py-2" placeholder="e.g., Marina View 2BR Apartment"  />
            </div>
            <div>
              <label className="block text-sm font-medium">Property Name/Title Name Arabic</label>
              <input {...register("agent_name")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
          </div> */}

          <div>
            <label className="block text-sm font-medium">Property Name / Title</label>
            <input {...register("name", { required: true })} className="mt-1 w-full rounded border px-3 py-2" placeholder="e.g., Marina View 2BR Apartment" />
          </div>
          

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium">Type</label>
              <select {...register("type")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
                {["Apartment","Villa", "Office", "Shop",
  "Warehouse", "Factory", "Labour Camp", "Other Commercial",
  "Commercial Building", "Residential Floor", "Commercial Floor",
  "Residential Land", "Commercial Land", "Townhouse", "Residential Building", 
  "Hotel Apartment", "Loft Apartment", "Duplex", "Pent House"].map((t)=>(
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Purpose</label>
              <select {...register("purpose")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            {allFields.purpose === "Rent" && (
              <>
              <div>
              <label className="block text-sm font-medium">Rent Frequency</label>
              <select {...register("rent_frequency")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
              <option value="Yearly">Yearly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            </>
            )}
            <div>
              <label className="block text-sm font-medium">Furnished</label>
              <select {...register("furnished")} className="mt-1 w-full rounded border px-3 py-2">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Partly">Partly</option>
              </select>
            </div>
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium">Price (AED)</label>
              <input type="number" {...register("base_price")} className="mt-1 w-full rounded border px-3 py-2" placeholder="1850000" />
            </div>
            <div>
              <label className="block text-sm font-medium">Beds</label>
              <input type="number" {...register("beds")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Baths</label>
              <input type="number" {...register("baths")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Property Size (sq ft)</label>
              <input type="number" {...register("sqft")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Plot Area (sq ft)</label>
              <input type="number" {...register("plotArea")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Off Plan</label>
              <select {...register("off_plan")} className="mt-1 w-full rounded border px-3 py-2">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
           
            
          </div>

          {allFields.off_plan === "Yes" && (  
            <>
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
             <div>
              <label className="block text-sm font-medium">Off Plan Details Sale Type</label>
              <select {...register("off_plan_details_sale_type")} className="mt-1 w-full rounded border px-3 py-2">
                <option value="New">New</option>
                <option value="Resale">Resale</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">DLD Waiver</label>
              <input type="number" {...register("off_plan_details_ddl_waiver")} className="mt-1 w-full rounded border px-3 py-2" placeholder="Dubai" />
            </div>
            <div>
              <label className="block text-sm font-medium">Original Price</label>
              <input type="number" {...register("off_plan_details_original_price")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Amount Paid</label>
              <input type="number" {...register("off_plan_details_amount_paid")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
          </div>
            </>
          )}
          
          





          {/* Numbers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
              <label className="block text-sm font-medium">Tower Name</label>
              <input type="text" {...register("buildingName")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">City</label>
              <input type="text" {...register("city")} className="mt-1 w-full rounded border px-3 py-2" placeholder="Dubai" />
            </div>
            <div>
              <label className="block text-sm font-medium">Locality</label>
              <input type="text" {...register("locality")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Sub Locality</label>
              <input type="text" {...register("sub_locality")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
          </div>

          {/* Location + dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Location</label>
              <input {...register("location")} className="mt-1 w-full rounded border px-3 py-2" placeholder="e.g., Dubai Marina" />
            </div>
            
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
              <label className="block text-sm font-medium">Available From</label>
              <input type="date" {...register("availablefrom")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Added Date</label>
              <input type="date" {...register("addedDate")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
           
            <div>
              <label className="block text-sm font-medium">Year of Completion</label>
              <input type="number" {...register("yearofcompletion")} className="mt-1 w-full rounded border px-3 py-2" placeholder="2022" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium">Floors</label>
              <input type="number" {...register("floors")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Google Map Link</label>
              <input {...register("mapLink")} className="mt-1 w-full rounded border px-3 py-2" placeholder="https://maps.google.com/..." />
            </div>
          </div>

          {/* Authorities / IDs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-sm font-medium">Permit No</label>
              <input {...register("permitNo")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">DED</label>
              <input {...register("DED")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">RERA</label>
              <input {...register("RERA")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">BRN</label>
              <input {...register("BRN")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Reference ID</label>
              <input {...register("RefId")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Visibility</label>
              <select {...register("visibility")} className="mt-1 w-full rounded border px-3 py-2 capitalize">
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="draft">draft</option>
              </select>
            </div>
            
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register("description")} rows={6} className="mt-1 w-full rounded border px-3 py-2" placeholder="Key details, features, nearby locations..." />
          </div>

          {/* Amenities – tags or quick CSV */}
          <div>
            <label className="block text-sm font-medium">Amenities</label>
            <div className="mt-1 flex gap-2">
              <input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }}
                className="w-full rounded border px-3 py-2"
                placeholder="Type an amenity and press Enter (e.g., Pool)"
              />
              <button type="button" onClick={addAmenity} className="inline-flex items-center gap-2 rounded bg-gray-900 px-3 py-2 text-sm text-white">
                <Plus size={16} /> Add
              </button>
            </div>

            {!!amenities.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {a}
                    <button type="button" className="rounded p-0.5 hover:bg-gray-200" onClick={() => removeAmenity(a)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <p className="mt-2 text-xs text-gray-500">
              Or paste a comma‑separated list:
            </p>
            <input
              {...register("amenitiesInput")}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="Pool, Gym, Balcony"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium">Property Images (up to 20)</label>
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed px-4 py-10 text-sm text-gray-600 hover:bg-gray-50">
              <UploadCloud size={18} />
              <span>Select images</span>
              <input type="file" multiple accept="image/*" className="hidden" {...register("image")} />
            </label>
            {!!imageNames.length && (
              <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
                {imageNames.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>

          {/* QR Code */}
          <div>
            <label className="block text-sm font-medium">QR Code (optional)</label>
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed px-4 py-6 text-sm text-gray-600 hover:bg-gray-50">
              <UploadCloud size={18} />
              <span>Select QR image</span>
              <input type="file" accept="image/*" className="hidden" {...register("QRcode")} />
            </label>
            {qrcodeName && <p className="mt-1 text-sm text-gray-700">{qrcodeName}</p>}
          </div>
        </div>

        {/* Right: publish box */}
        <div>
          <div className="sticky top-20 rounded-lg border bg-white p-4">
            <h2 className="text-sm font-semibold">Publish</h2>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <select {...register("status")} className="rounded border px-2 py-1 text-sm capitalize">
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Sold">Sold</option>
                  <option value="Under management">Under management</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Visibility</span>
                <select {...register("visibility")} className="rounded border px-2 py-1 text-sm capitalize">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div>
  <label className="block text-sm font-medium mb-1">Portals</label>
  <div className="flex gap-4">
    {["Bayut", "dubizzle"].map((portal) => (
      <label key={portal} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={portal}
          checked={selectedPortals.includes(portal)}
          onChange={() => togglePortal(portal)}
          className="form-checkbox"
        />
        {portal}
      </label>
    ))}
  </div>

  {/* Submit hidden field with comma-separated portals */}
  <input type="hidden" name="portals" value={selectedPortals.join(",")} />
</div>
          <div>
          <label className="block text-sm font-medium">Assign Agent</label>
          <select {...register("agent")} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— Select —</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>
            {selectedAgentId && (
              <>
              <div>
              <label className="block text-sm font-medium">Agent Name</label>
              <input {...register("agent_name")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Agent Phone</label>
              <input {...register("agent_phone")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Agent Name</label>
              <input {...register("agent_email")} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
              </>
            )}
            

            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button type="submit" disabled={isSubmitting} className="rounded bg-emerald-700 px-4 py-2 text-white disabled:opacity-60">
                {isSubmitting ? "Saving…" : "Save Property"}
              </button>
              <button type="button" onClick={() => reset()} className="rounded border px-4 py-2">
                Reset
              </button>
            </div>

            {/* <p className="mt-3 text-xs text-gray-500">
              This submits <code>multipart/form-data</code> to <code>{API_URL}</code>.
            </p> */}
          </div>
        </div>
      </form>
    </section>
  );
}
