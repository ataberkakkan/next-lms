"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed Out Successfully");
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  };

  return handleSignOut;
};
