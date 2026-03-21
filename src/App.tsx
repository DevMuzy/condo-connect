import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import ChamadosPage from "@/pages/ChamadosPage";
import NovoChamado from "@/pages/NovoChamado";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chamado/novo" element={<NovoChamado />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/chamados"
              element={
                <ProtectedRoute>
                  <AdminLayout><ChamadosPage /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
