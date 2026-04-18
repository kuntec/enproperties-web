import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type Option = { label: string; value: string };

const PURPOSE: Option[] = [
  { label: "Buy",  value: "buy"  },
  { label: "Rent", value: "rent" },
  { label: "Sell", value: "sell" },
];

const TYPES: Option[] = [
  { label: "Property Type", value: "" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
];

const PRICES: Option[] = [
  { label: "Any", value: "" },
  { label: "250k", value: "250000" },
  { label: "500k", value: "500000" },
  { label: "1M",   value: "1000000" },
  { label: "2M",   value: "2000000" },
  { label: "5M",   value: "5000000" },
  { label: "10M",  value: "10000000" },
];

const ROOMS: Option[] = [
  { label: "Any", value: "" },
  { label: "Studio", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4plus" },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [purpose, setPurpose] = useState("buy");
  const [ptype, setPtype] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (purpose) params.set("purpose", purpose);
    if (ptype) params.set("type", ptype);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (beds) params.set("beds", beds);
    if (baths) params.set("baths", baths);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-xl bg-white p-2 shadow-lg"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(280px,1fr)_repeat(6,max-content)_120px] md:items-center">
        {/* Search input */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 md:h-12">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, community or building"
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </div>

        <SmallSelect value={purpose} onValueChange={setPurpose} options={PURPOSE} />
        <SmallSelect value={ptype} onValueChange={setPtype} options={TYPES} placeholder="Property Type" />
        <SmallSelect value={min} onValueChange={setMin} options={PRICES} placeholder="Min Price" />
        <SmallSelect value={max} onValueChange={setMax} options={PRICES} placeholder="Max Price" />
        <SmallSelect value={beds} onValueChange={setBeds} options={ROOMS} placeholder="Bedrooms" />
        <SmallSelect value={baths} onValueChange={setBaths} options={ROOMS} placeholder="Bathrooms" />

        <button
          type="submit"
          className="h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary"
        >
          Find
        </button>
      </div>
    </form>
  );
}

/* ---------- tiny Radix Select wrapper to match the UI ---------- */
function SmallSelect({
  value,
  onValueChange,
  options,
  placeholder,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  const display = options.find((o) => o.value === value)?.label || placeholder || options[0]?.label;

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={clsx(
          "inline-flex h-12 min-w-[140px] items-center justify-between rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-primary"
        )}
      >
        <Select.Value aria-label={value}>{display}</Select.Value>
        <Select.Icon>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-50 w-[--radix-select-trigger-width] overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black/10"
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value + opt.label}
                value={opt.value}
                className={clsx(
                  "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-900",
                  "focus:bg-gray-100 focus:outline-none data-[state=checked]:bg-primary"
                )}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="h-4 w-4 text-primary" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
