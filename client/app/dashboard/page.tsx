import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
