import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const router = useRouter();

  // Check thy user
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      try {
        const session = await authClient.getSession();
        if (!session.data?.user) {
          router.push("/");
        } else {
          setUser(session.data.user);
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, authLoading };
};
