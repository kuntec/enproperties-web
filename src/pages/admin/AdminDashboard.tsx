import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  } from "recharts";
  
  type Kpi = { label: string; value: string; sub?: string };
  const KPIS: Kpi[] = [
    { label: "Total Properties", value: "1,248", sub: "↑ 3.2% vs last week" },
    { label: "Active Leads", value: "312", sub: "↑ 18 new today" },
    { label: "Assigned Leads", value: "207", sub: "66% assignment rate" },
    { label: "Agents", value: "42", sub: "3 online now" },
  ];
  
  const leadsTrend = [
    { day: "Mon", leads: 24 }, { day: "Tue", leads: 31 }, { day: "Wed", leads: 27 },
    { day: "Thu", leads: 45 }, { day: "Fri", leads: 38 }, { day: "Sat", leads: 20 }, { day: "Sun", leads: 29 },
  ];
  
  const propsByType = [
    { type: "Apartment", count: 720 },
    { type: "Villa", count: 210 },
    { type: "Townhouse", count: 140 },
    { type: "Penthouse", count: 32 },
    { type: "Commercial", count: 146 },
  ];
  
  const funnel = [
    { stage: "New", value: 312 },
    { stage: "Contacted", value: 228 },
    { stage: "Visit Scheduled", value: 156 },
    { stage: "Negotiation", value: 72 },
    { stage: "Won", value: 26 },
  ];
  
  const topAgents = [
    { name: "James Price", deals: 9, leads: 27 },
    { name: "Layla Khan", deals: 7, leads: 22 },
    { name: "Omar Rahman", deals: 6, leads: 19 },
    { name: "Sarah Chen", deals: 5, leads: 16 },
  ];
  
  const recentLeads = [
    { name: "Ahmed Ali", contact: "ahmed@email.com", stage: "New", prefs: "Buy • Marina" },
    { name: "Maria Gomez", contact: "+971 50 111 2222", stage: "Contacted", prefs: "Rent • Downtown" },
    { name: "Viktor Petrov", contact: "viktor@email.com", stage: "Visit Scheduled", prefs: "Villa • Meadows" },
    { name: "Huda Noor", contact: "huda@email.com", stage: "Negotiation", prefs: "Apartment • JVC" },
  ];
  
  const tasks = [
    { id: 1, title: "Call back Ahmed (budget 1.5M)", due: "Today 4:00 PM" },
    { id: 2, title: "Share Marina brochure with Maria", due: "Tomorrow" },
    { id: 3, title: "Schedule viewing for Viktor", due: "Wed" },
  ];
  
  export default function AdminDashboard() {
    const maxFunnel = Math.max(...funnel.map(f => f.value));
  
    return (
      <section className="space-y-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
  
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-lg border bg-white p-4">
              <div className="text-xs uppercase tracking-wider text-gray-500">{k.label}</div>
              <div className="mt-1 text-2xl font-semibold">{k.value}</div>
              {k.sub && <div className="mt-1 text-xs text-gray-500">{k.sub}</div>}
            </div>
          ))}
        </div>
  
        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Leads trend */}
          <div className="rounded-lg border bg-white p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Leads (Last 7 days)</h2>
              <span className="text-xs text-gray-500">UI mock</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadsTrend} margin={{ left: -20, right: 10 }}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ opacity: 0.2 }} />
                  <Area type="monotone" dataKey="leads" stroke="currentColor" fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* Properties by type */}
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold">Properties by Type</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propsByType} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="type" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ opacity: 0.2 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
  
        {/* Funnel + Top agents */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold">Sales Funnel</h2>
            <ul className="space-y-3">
              {funnel.map((f) => (
                <li key={f.stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{f.stage}</span>
                    <span className="text-gray-500">{f.value}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-gray-100">
                    <div
                      className="h-2 rounded bg-emerald-700"
                      style={{ width: `${(f.value / maxFunnel) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="rounded-lg border bg-white p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm font-semibold">Top Agents (This Month)</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {topAgents.map((a) => (
                <div key={a.name} className="flex items-center justify-between rounded border p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-800">
                      {a.name.split(" ").map(s => s[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.leads} leads</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">{a.deals}</span> deals
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Recent leads + Tasks */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 lg:col-span-2">
            <h2 className="mb-3 text-sm font-semibold">Recent Leads</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="p-3">Name</th>
                    <th>Contact</th>
                    <th>Stage</th>
                    <th>Preferences</th>
                    <th className="w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((l, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{l.name}</td>
                      <td>{l.contact}</td>
                      <td className="capitalize">{l.stage}</td>
                      <td>{l.prefs}</td>
                      <td>
                        <button className="rounded border px-3 py-1">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold">My Tasks</h2>
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center justify-between rounded border p-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <span className="text-sm">{t.title}</span>
                  </label>
                  <span className="text-xs text-gray-500">{t.due}</span>
                </li>
              ))}
            </ul>
            <button className="mt-3 w-full rounded border px-3 py-2 text-sm">Add Task</button>
          </div>
        </div>
      </section>
    );
  }
  