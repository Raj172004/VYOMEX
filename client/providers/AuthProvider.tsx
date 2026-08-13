"use client";

import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/auth/auth.service";
import { getAccessToken } from "@/lib/auth/tokens";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    authenticated,
    setLoading,
    setUser,
    logout,
  } = useAuth();

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        if (mounted) {
          setLoading(false);
        }

        return;
      }

      setLoading(true);

      try {
        const response =
          await AuthService.getProfile();

        if (!mounted) {
          return;
        }

        setUser(response.data.data);
      } catch {
        if (mounted) {
          logout();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    hydrateAuth();

    return () => {
      mounted = false;
    };
  }, [setLoading, setUser, logout]);

  void authenticated;

  return <>{children}</>;
}
