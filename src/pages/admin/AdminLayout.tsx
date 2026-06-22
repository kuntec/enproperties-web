import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const items = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/properties", label: "Properties" },
  { to: "/admin/leads", label: "Leads" },
  { to: "/admin/agents", label: "Agents" },
  { to: "/admin/sell", label: "Sell Property" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // for small screens
  const [desktopSidebar, setDesktopSidebar] = useState(true); // for large screens
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const role = userStr ? JSON.parse(userStr).role : null;
    if (!token || role !== "Admin") {
      navigate("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 z-50 h-full bg-white border-r shadow-md transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:static sm:translate-x-0 sm:z-10 ${desktopSidebar ? "w-64" : "w-16"}`}
      >
        <div className="flex h-14 items-center justify-between px-3 border-b">
          <div className="text-sm font-semibold">
            {desktopSidebar ? "Enclave CRM" : "CRM"}
          </div>
          <button
            onClick={() => {
              if (window.innerWidth < 640) {
                setSidebarOpen(false);
              } else {
                setDesktopSidebar(!desktopSidebar);
              }
            }}
            className="rounded p-2 hover:bg-gray-100"
          >
            <Menu size={18} />
          </button>
        </div>
        <nav className="px-2 py-4 space-y-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${
                  isActive
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {desktopSidebar || window.innerWidth < 640 ? i.label : i.label[0]}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white px-4 sm:px-6 shadow-sm">
          <div className="flex items-center space-x-2">
            <button
              className="sm:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <span className="text-base font-semibold hidden sm:block">Admin</span>
          </div>
          <div className="text-sm text-gray-600">
            Welcome to <span className="font-medium">Enproperties</span>
          </div>
          <button
            onClick={logout}
            className="rounded px-3 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-7xl p-4 w-full">{children}</main>
      </div>
    </div>
  );
}
