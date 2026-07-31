"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/register.schema";

import { AuthService } from "@/services/auth/auth.service";
import { useAuth } from "@/hooks/useAuth";

import AuthCard from "../shared/AuthCard";
import AuthDivider from "../shared/AuthDivider";
import AuthHeader from "../shared/AuthHeader";
import SocialLogin from "../shared/SocialLogin";

import {
  Input,
  PasswordInput,
  SubmitButton,
  FormError,
} from "@/components/ui/form";

export default function RegisterForm() {
  const router = useRouter();

  const { setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      setLoading(true);

      await AuthService.register(values);

      router.push("/login");
    } catch {
      setError("root", {
        message:
          "Unable to create your account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        badge="Create Account"
        title="Register"
        description="Create your VYOMEX account and start collaborating."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
      >
        <Input
          label="First Name"
          icon={User}
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <Input
          label="Last Name"
          icon={User}
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <Input
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          {...register("password")}
        />

        <FormError
          message={errors.root?.message}
        />

        <SubmitButton loading={isSubmitting}>
          Create Account
        </SubmitButton>
      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-8 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-cyan-600"
        >
          Sign In
        </Link>
      </p>
    </AuthCard>
  );
}