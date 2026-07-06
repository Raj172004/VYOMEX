"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import AuthLoading from "../loading/AuthLoading";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const { authenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace("/login");
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return <AuthLoading />;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}