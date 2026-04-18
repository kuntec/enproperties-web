
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Properties from "./pages/Properties";
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import ScrollToTop from "./components/ScrollToTop";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import OffPlan from "./pages/OffPlan";
import Commercial from "./pages/Commercial";
import LoginPage from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminPropeties";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminAgents from "./pages/admin/AdminAgents";
import AddPropertyForm from "./pages/admin/AddPropertyForm";
import ViewProperty from "./pages/admin/ViewProperty";
import EditProperty from "./pages/admin/EditProperty";
import AddAgent from "./pages/admin/AddAgent";
import EditAgent from "./pages/admin/EditAgent";
import AdminAddLead from "./pages/admin/AdminAddLead";
import EditLead from "./pages/admin/EditLead";
import AgentLogin from "./pages/agent/AgentLogin";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentLayout from "./pages/agent/AgentLayout";
import AgentLeads from "./pages/agent/AgentLeads";
import SellProperty from "./pages/admin/SellProperty";
import PropertyForm from "./pages/admin/PropertyForm";
import PropertyFeed from "./pages/PropertyFeed";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
          
            <Route path="/" element={<Index />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/off-plan" element={<OffPlan />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/blogs" element={<Index />} /> */}
            <Route path="/property/:id" element={<PropertyDetails />} />

            <Route path="/admin/login" element={<LoginPage />} />

            <Route path="/agent/login" element={<AgentLogin />} />

            <Route path="/agent/dashboard" element={<AgentLayout> <AgentDashboard></AgentDashboard> </AgentLayout>} />
            <Route path="/agent/leads" element={<AgentLayout> <AgentLeads></AgentLeads> </AgentLayout>} />

            <Route path="/admin/dashboard" element={<AdminLayout> <AdminDashboard></AdminDashboard> </AdminLayout>} />

            <Route path="/admin/properties" element={<AdminLayout> <AdminProperties/> </AdminLayout>} />
            <Route path="/admin/sell" element={<AdminLayout> <SellProperty/> </AdminLayout>} />

            <Route path="/admin/properties/new" element={<AdminLayout> <AddPropertyForm/> </AdminLayout>} />

            <Route path="/admin/leads" element={<AdminLayout> <AdminLeads/> </AdminLayout>} />
            <Route path="/admin/leads/new" element={<AdminLayout> <AdminAddLead/> </AdminLayout>} />
            <Route path="/admin/leads/edit/:id" element={<AdminLayout> <EditLead/> </AdminLayout>} />


            <Route path="/admin/agents" element={<AdminLayout> <AdminAgents/> </AdminLayout>} />

            <Route path="/admin/agents/new" element={<AdminLayout> <AddAgent/> </AdminLayout>} />

            <Route path="/admin/agents/edit/:id" element={<AdminLayout> <EditAgent/> </AdminLayout>} />


            <Route path="/admin/properties/:id" element={<AdminLayout> <ViewProperty/> </AdminLayout>} />

            <Route path="/admin/properties/edit/:id" element={<AdminLayout> <EditProperty/> </AdminLayout>} />

            <Route path="/property-feed" element={<PropertyFeed />} />



            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
