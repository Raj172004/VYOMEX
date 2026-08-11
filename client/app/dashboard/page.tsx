import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ClientsPage from "@/components/dashboard/clients/ClientsPage";

export default function DashboardClientsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ClientsPage />
      </DashboardLayout>
    </ProtectedRoute>
  );
}