"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import { AppSidebar } from "@/components/app-sidebar";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col flex-1 h-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
