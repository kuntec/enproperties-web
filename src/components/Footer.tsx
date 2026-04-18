// src/components/Footer.tsx
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F7] text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-200">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
      {/* Company Info */}
      <div className="space-y-3 sm:col-span-2 md:col-span-1">
      <img src="/2.png" alt="" width="110px" height={"110px"} />
            <p className="text-gray-800">+971 58 225 7194</p>
            <p className="text-gray-800">info@enproperties.ae</p>
            <p className="text-gray-800">
              Enclave Horizon Real Estate LLC<br />
              Wafi Residence, Um Hurair Second, Dubai, UAE
              
            </p>
            {/* <button className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black">
              <MapPin size={16} className="text-orange-500" />
              Get Directions
            </button> */}
          </div>

          {/* Property */}
          <div>
            <h3 className="font-bold uppercase tracking-wide text-[#0D3B66]">Property</h3>
            <ul className="mt-3 space-y-2">
              {["Buy", "Rent", "Sell", "Off Plan", "Commercial"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold uppercase tracking-wide text-[#0D3B66]">Resources</h3>
            <ul className="mt-3 space-y-2">
              {["Community Guides", "News & Insights", "Market Reports", "Property Videos", "Podcasts"].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-bold uppercase tracking-wide text-[#0D3B66]">About Us</h3>
            <ul className="mt-3 space-y-2">
              {["About", "Meet The Team", "Careers", "Apply Now", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold uppercase tracking-wide text-[#0D3B66]">Connect</h3>
            <ul className="mt-3 space-y-2">
              {["Instagram", "Facebook", "Youtube", "LinkedIn", "Tiktok"].map((item) => (
                <li key={item}>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
           
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 md:flex-row items-center justify-between text-xs text-gray-600">
        <div className="flex flex-wrap gap-4">
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link>
          <Link to="/complaints" className="hover:underline">Complaints</Link>
        </div>
        <div className="flex items-center gap-2">
          <span>© Enclave Horizon 2025</span>
          <span className="hidden md:inline-block">|</span>
          <span>Design & Develop by <a href="https://elexa.ae" target="_blank" rel="noopener noreferrer">Elexa.ae</a></span>
        </div>
      </div>
    </footer>
  );
}
