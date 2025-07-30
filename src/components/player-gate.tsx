"use client";
import { useEffect, useState } from "react";
import ClientProviders from "@/providers/client-provider";
import { usePathname, useRouter } from "next/navigation";

export default function PlayerGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedId = localStorage.getItem("selectedPlayerId");
    if (!savedId && pathname !== "/choose") {
      router.replace("/choose"); // ✅ Redirect to choose page
    } else {
      setChecked(true); // ✅ Only render children when ID exists
    }
  }, [router, pathname]);

  if (!checked) {
    return null; // could return a loading spinner instead
  }

  return <ClientProviders>{children}</ClientProviders>;
}
