
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CycleTracking from "./pages/CycleTracking";
import Menopause from "./pages/Menopause";
import BreastHealth from "./pages/BreastHealth";
import ReproductiveHealth from "./pages/ReproductiveHealth";
import WorkplaceWellness from "./pages/WorkplaceWellness";
import Doctors from "./pages/Doctors";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cycle" element={<CycleTracking />} />
            <Route path="/menopause" element={<Menopause />} />
            <Route path="/breast-health" element={<BreastHealth />} />
            <Route path="/reproductive-health" element={<ReproductiveHealth />} />
            <Route path="/workplace" element={<WorkplaceWellness />} />
            <Route path="/doctors" element={<Doctors />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
