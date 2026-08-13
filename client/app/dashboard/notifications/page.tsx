import ProtectedRoute from "@/components/auth/guard/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import NotificationPanel from "@/components/dashboard/notifications/NotificationPanel";

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Workspace
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Notifications
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Stay up to date with the latest activity and workspace updates.
            </p>
          </div>

          <NotificationPanel />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
