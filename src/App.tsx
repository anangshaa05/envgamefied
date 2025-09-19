import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import LearningHub from "@/pages/LearningHub";
import LessonDetail from "@/pages/LessonDetail";
import Challenges from "@/pages/Challenges";
import Leaderboard from "@/pages/Leaderboard";
import Community from "@/pages/Community";
import NotFound from "./pages/NotFound";
import LogoProcessor from "@/components/LogoProcessor";
import TeacherDashboard from "@/pages/TeacherDashboard";
import NGODashboard from "@/pages/NGODashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isNGODashboard = location.pathname === "/ngo-dashboard";

  return (
    <div className="min-h-screen bg-background">
      {!isNGODashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learning" element={<LearningHub />} />
        <Route path="/learning/:id" element={<LessonDetail />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/logo-processor" element={<LogoProcessor />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
