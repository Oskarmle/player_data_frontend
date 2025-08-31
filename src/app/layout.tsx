"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import { UsersProvider } from "./providers/user-provider";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import ShowSeason from "@/components/custom/show-season";
import MobileNav from "@/components/custom/mobile-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="bg-background h-screen">
        <QueryProvider>
          <UsersProvider>
            <SidebarProvider>
              <div className="flex h-screen w-full">
                <div className="hidden sm:block">
                  <AppSidebar />
                </div>
                <div className="flex flex-col flex-1 w-full">
                  <div className="sm:hidden sticky top-0 z-30 w-full p-2 pb-0">
                    <MobileNav />
                  </div>
                  <main className="flex flex-col flex-1 p-4 gap-4">
                    <ShowSeason />
                    {children}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </UsersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
