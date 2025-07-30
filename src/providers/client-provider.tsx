"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const getPlayerId = () => localStorage.getItem("selectedPlayerId");

    setPlayerId(getPlayerId());

    const onPlayerIdChanged = () => {
      setPlayerId(getPlayerId());
    };

    window.addEventListener("playerIdChanged", onPlayerIdChanged);

    return () => {
      window.removeEventListener("playerIdChanged", onPlayerIdChanged);
    };
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider>
        {playerId ? (
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col flex-1 h-full pl-64">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        ) : (
          <main className="flex flex-col flex-1 h-full">{children}</main>
        )}
      </ThemeProvider>
    </QueryProvider>
  );
}
