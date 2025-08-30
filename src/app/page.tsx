import { AppSidebar } from "@/components/custom/desktop-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset></SidebarInset>
    </SidebarProvider>
  );
}
