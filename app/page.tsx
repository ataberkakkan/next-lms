"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Signed Out Successfully");
        },
      },
    });
  };

  return (
    <div>
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Log Out</Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Log In</Button>
      )}
    </div>
  );
}
