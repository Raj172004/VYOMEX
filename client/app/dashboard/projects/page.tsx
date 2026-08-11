import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import ProjectsPageContent from "@/components/dashboard/projects/ProjectsPage";

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectsPageContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
