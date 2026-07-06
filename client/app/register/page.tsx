import AuthLayout from "@/components/auth/layout/AuthLayout";
import RegisterForm from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join VYOMEX and start managing your digital projects with confidence."
    >
      <RegisterForm />
    </AuthLayout>
  );
}