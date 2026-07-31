"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginSchema,
} from "@/schemas/login.schema";
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

export default function LoginForm() {
  const { login, setLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
  try {
    setLoading(true);

    const response = await AuthService.login(values);

    login(response.data.data);
  } catch {
    setError("root", {
      message: "Invalid email or password.",
    });
  } finally {
    setLoading(false);
  }
}
  return (
    <AuthCard>
      <AuthHeader
        badge="Welcome Back"
        title="Sign In"
        description="Access your VYOMEX dashboard."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-6"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          error={errors.password?.message}
        />

        <FormError
          message={errors.root?.message}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-cyan-600"
          >
            Forgot Password?
          </Link>
        </div>

        <SubmitButton loading={isSubmitting}>
          Sign In
        </SubmitButton>
      </form>

      <AuthDivider />

      <SocialLogin />

      <p className="mt-8 text-center text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-cyan-600"
        >
          Create Account
        </Link>
      </p>
    </AuthCard>
  );
}