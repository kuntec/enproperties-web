import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";


export default function SearchBarUI({ onSearch }: { onSearch: (data: any[]) => void }) {

  const [q, setQ] = useState("");
  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const query: Record<string, string> = {};
    if (q) query.q = q;
    if (purpose) query.purpose = purpose;
    if (type) query.type = type;
    if (bedrooms) query.beds = bedrooms;
    if (bathrooms) query.baths = bathrooms;

    // Optional: handle price filtering on frontend
    const res = await axios.get(`${API_BASE_URL}/properties`, {
      params: query,
    });

    onSearch(res.data.properties || []);

  };



  

  return (
    <div className="w-full rounded-xl bg-white p-2 shadow-lg">
      <form
        onSubmit={handleSearch} // UI only
        className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(260px,1fr)_repeat(6,max-content)_110px] md:items-center"
      >
        {/* Text search */}
        <div className="flex h-12 items-center gap-2 rounded-lg border border-gray-300 px-3">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            name="searchText"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, community or building"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </div>

       {/* Dropdowns */}
      <Select name="purpose" value={purpose} onChange={setPurpose} options={["buy", "rent"]} />
      <Select name="type" value={type} onChange={setType} options={["apartment", "villa", "townhouse", "penthouse"]} />
      <Select name="minPrice" value={minPrice} onChange={setMinPrice} options={["100000", "200000", "500000", "1000000"]} />
      <Select name="maxPrice" value={maxPrice} onChange={setMaxPrice} options={["500000", "1000000", "2000000", "5000000"]} />
      <Select name="bedrooms" value={bedrooms} onChange={setBedrooms} options={["1", "2", "3", "4", "5"]} />
      <Select name="bathrooms" value={bathrooms} onChange={setBathrooms} options={["1", "2", "3", "4", "5"]} />


        <button
          type="submit"
          className="h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary"
        >
          Find
        </button>
      </form>
    </div>
  );
}

function Select({
  name,
  value,
  onChange,
  options,
  label,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label?: string;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 min-w-[140px] rounded-lg border border-gray-300 px-3 text-sm text-gray-800"
    >
      <option value="">{label || capitalize(name)}</option>
      {options
        .filter((opt) => opt !== "")
        .map((opt) => (
          <option key={opt} value={opt}>
            {capitalize(opt)}
          </option>
        ))}
    </select>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
