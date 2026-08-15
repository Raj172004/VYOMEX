import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import TasksPageContent from "@/components/dashboard/tasks/TasksPage";

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TasksPageContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}