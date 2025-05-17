
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
import { Suspense } from "react";

const queryClient = new QueryClient();

// Create separate error boundaries for routes
const SafeRoute = ({ element }: { element: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      {element}
    </Suspense>
  </ErrorBoundary>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SafeRoute element={<Index />} />} />
            <Route path="/cycle" element={<SafeRoute element={<CycleTracking />} />} />
            <Route path="/menopause" element={<SafeRoute element={<SafeRoute element={<Menopause />} />} />} />
            <Route path="/breast-health" element={<SafeRoute element={<BreastHealth />} />} />
            <Route path="/reproductive-health" element={<SafeRoute element={<ReproductiveHealth />} />} />
            <Route path="/workplace" element={<SafeRoute element={<WorkplaceWellness />} />} />
            <Route path="/doctors" element={<SafeRoute element={<Doctors />} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
