import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Schools from "./pages/Schools";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Chapters from "./pages/Chapters";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSchools from "./pages/admin/AdminSchools";
import AdminClasses from "./pages/admin/AdminClasses";
import AdminSubjects from "./pages/admin/AdminSubjects";
import AdminChapters from "./pages/admin/AdminChapters";
import AdminPassKeys from "./pages/admin/AdminPassKeys";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="schools" element={<Schools />} />
            <Route path="schools/:schoolId/classes" element={<Classes />} />
            <Route path="classes/:classId/subjects" element={<Subjects />} />
            <Route path="subjects/:subjectId/chapters" element={<Chapters />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="schools" element={<AdminSchools />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="chapters" element={<AdminChapters />} />
            <Route path="passkeys" element={<AdminPassKeys />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
