import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ClientsPageContent from "@/components/dashboard/clients/ClientsPage";

export default function ClientsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ClientsPageContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
