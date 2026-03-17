import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StartupLiftCaseStudy from "./pages/StartupLiftCaseStudy";
import InkdropCaseStudy from "./pages/InkdropCaseStudy";
import ListiqueCaseStudy from "./pages/ListiqueCaseStudy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="bg-mesh" />
      <div className="bg-dot-grid" />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workflow/startuplift" element={<StartupLiftCaseStudy />} />
          <Route path="/workflow/inkdrop" element={<InkdropCaseStudy />} />
          <Route path="/workflow/listique" element={<ListiqueCaseStudy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}



          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
