// File: frontend/src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import toast from "react-hot-toast";
import { toast } from 'sonner';
import { API_BASE_URL } from "../../lib/api";


const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.role !== "Agent") {
        throw new Error("This account is not an agent account.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged in successfully");
      navigate("/agent/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-6">
        <div className="text-center">
          {/* Replace src with your actual logo path */}
          <img src="/logo_dark.png" alt="Enproperties Logo" className="w-20 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Enproperties Agent CRM</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="agent@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div> */}

          <button
            type="submit"
            className="w-full bg-emerald-700 text-white font-semibold py-2 rounded hover:bg-emerald-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    
    {/* <form onSubmit={handleLogin} className="space-y-4 p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
        className="w-full border px-3 py-2 rounded" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
        className="w-full border px-3 py-2 rounded" required />
      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border px-3 py-2 rounded">
        <option value="admin">Admin</option>
        <option value="agent">Agent</option>
      </select>
      <button type="submit" className="w-full bg-emerald-700 text-white py-2 rounded">Login</button>
    </form> */}
  
    </>
  );
};

export default AgentLogin;
