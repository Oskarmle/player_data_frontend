"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import { UsersProvider } from "./providers/user-provider";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import ShowSeason from "@/components/custom/show-season";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html //className="dark"
    >
      <body className="bg-background h-screen">
        <QueryProvider>
          <UsersProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-col w-full p-4 gap-4">
                <ShowSeason />
                {children}
              </div>
            </SidebarProvider>
          </UsersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
