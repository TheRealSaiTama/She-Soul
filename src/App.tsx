import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import CycleTracking from "./pages/CycleTracking";
import Menopause from "./pages/Menopause";
import BreastHealth from "./pages/BreastHealth";
import ReproductiveHealth from "./pages/ReproductiveHealth";
import WorkplaceWellness from "./pages/WorkplaceWellness";
import Doctors from "./pages/Doctors";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import DatePickerTest from "./pages/DatePickerTest";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Suspense } from "react";
import Pricing from "./pages/Pricing";

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
            <Route path="/" element={<SafeRoute element={<LandingPage />} />} />
            <Route path="/cycle" element={<SafeRoute element={<CycleTracking />} />} />
            <Route path="/menopause" element={<SafeRoute element={<SafeRoute element={<Menopause />} />} />} />
            <Route path="/breast-health" element={<SafeRoute element={<BreastHealth />} />} />
            <Route path="/reproductive-health" element={<SafeRoute element={<ReproductiveHealth />} />} />
            <Route path="/workplace" element={<SafeRoute element={<WorkplaceWellness />} />} />
            <Route path="/doctors" element={<SafeRoute element={<Doctors />} />} />
            <Route path="/auth" element={<SafeRoute element={<AuthPage />} />} />
            <Route path="/select-dob" element={<SafeRoute element={<DatePickerTest />} />} />
            <Route path="/pricing" element={<SafeRoute element={<Pricing />} />} />
            <Route path="/dashboard" element={<SafeRoute element={<Index />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
