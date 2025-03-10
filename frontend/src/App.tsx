import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { VehiclesPage } from "./pages/vehicles/VehiclesPage";
import { PaymentsPage } from "./pages/payments/PaymentsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import PaymentRatesPage from "./pages/admin/PaymentRatesPage";
import UsersPage from "./pages/admin/UsersPage";
import RegistryPage from "./pages/government/RegistryPage";
import ReportsPage from "./pages/government/ReportsPage";
import GovtDashboard from "./pages/government/GovtDashboard";
import GovtSummary from "./pages/government/GovtSummary";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="vehicles" element={<VehiclesPage />} />
            <Route path="govt-dashboard" element={<GovtDashboard />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="payment-rates" element={<PaymentRatesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="registry" element={<RegistryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="/govt-summary" element={<GovtSummary/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
