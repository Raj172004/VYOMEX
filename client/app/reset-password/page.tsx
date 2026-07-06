import AuthLayout from "@/components/auth/layout/AuthLayout";
import ResetPasswordForm from "@/components/auth/reset/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password to regain access to your account."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}