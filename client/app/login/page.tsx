import AuthLayout from "@/components/auth/layout/AuthLayout";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your client dashboard, projects, invoices, and messages."
    >
      <LoginForm />
    </AuthLayout>
  );
}