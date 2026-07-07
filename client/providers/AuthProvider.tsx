"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLoading } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return <>{children}</>;
}