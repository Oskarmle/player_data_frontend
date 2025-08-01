"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import MobileNav from "@/components/mobile-nav";
import MobileFooter from "@/components/mobile-search";

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
            {/* Desktop sidebar */}
            <div className="hidden sm:block">
              <AppSidebar />
            </div>
            {/* Mobile sidebar */}
            <div className="flex flex-col flex-1 h-full sm:pl-64 overflow-x-hidden">
              <div className="sm:hidden fixed z-50 w-full top-0 left-0 p-2">
                <MobileNav />
              </div>
              <main className="flex-1 h-full m-0 pt-24 pb-10 sm:pt-0">
                <SidebarTrigger />
                {children}
              </main>
            </div>
          </SidebarProvider>
        ) : (
          <main className="flex flex-col flex-1 h-full">{children}</main>
        )}
      </ThemeProvider>
    </QueryProvider>
  );
}
