import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";
import { UsersProvider } from "./providers/user-provider";
import { AppSidebar } from "@/components/custom/desktop-sidebar";
import ShowSeason from "@/components/custom/show-season";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumb } from "@/components/custom/dynamic-breadcrumb";

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
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-8 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-8 px-4">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                      />
                      <DynamicBreadcrumb />
                    </div>
                  </header>
                  <div className="flex flex-col flex-1 w-full">
                    <main className="flex flex-col flex-1 p-4 gap-4">
                      <ShowSeason />
                      {children}
                    </main>
                  </div>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </UsersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
