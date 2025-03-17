
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentorProfile from "./pages/MentorProfile";
import BrowseMentors from "./pages/BrowseMentors";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HowItWorks from "./pages/HowItWorks";
import BecomeMentor from "./pages/BecomeMentor";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { WaterProvider } from "./contexts/WaterContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <PaymentProvider>
            <WaterProvider>
              <Toaster />
              <Sonner position="bottom-center" />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<BrowseMentors />} />
                <Route path="/mentor/:id" element={<MentorProfile />} />
                <Route 
                  path="/become-mentor" 
                  element={
                    <ProtectedRoute>
                      <BecomeMentor />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </WaterProvider>
          </PaymentProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
