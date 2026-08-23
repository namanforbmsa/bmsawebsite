import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import Company from "./pages/about/Company";
import Founder from "./pages/about/Founder";
import Team from "./pages/about/Team";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import TurnAround from "./pages/TurnAround";
import ReturnRefund from "./pages/ReturnRefund";
import ContactPolicy from "./pages/ContactPolicy";
import NotFound from "./pages/NotFound";
import AdminConsole from "./pages/AdminConsole";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* top inline logo removed — header now shows brand */}

        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          {/* Dynamic service route - all services use ServiceDetail which reads from server */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about/company" element={<Company />} />
          <Route path="/about/founder" element={<Founder />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/turn-around-time" element={<TurnAround />} />
          <Route path="/return-refund" element={<ReturnRefund />} />
          <Route path="/contact-policy" element={<ContactPolicy />} />
          <Route path="/admin" element={<AdminConsole />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
