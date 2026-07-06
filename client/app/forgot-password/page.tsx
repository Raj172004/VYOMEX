import AuthLayout from "@/components/auth/layout/AuthLayout";
import ForgotPasswordForm from "@/components/auth/forgot/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Recover access to your account securely."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}