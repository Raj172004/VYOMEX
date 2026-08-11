"use client";

import { ReactNode, useEffect, useState } from "react";
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!loading && !authenticated) {
      router.replace("/login");
    }
  }, [
    mounted,
    loading,
    authenticated,
    router,
  ]);

  /*
   * Server render and the first browser render
   * must be identical.
   *
   * We therefore do not render the protected
   * dashboard until the browser has mounted.
   */
  if (!mounted) {
    return null;
  }

  if (loading) {
    return <AuthLoading />;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
