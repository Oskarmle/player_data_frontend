"use client";
import { Home, User, Columns3 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import SelectUser from "./select-user";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Hjem",
    url: "/",
    icon: Home,
  },
  {
    title: "Din spiller profil",
    url: "/player",
    icon: User,
  },
  {
    title: "Alle kampe",
    url: "/games",
    icon: Columns3,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const handleResetPlayerId = () => {
    localStorage.removeItem("selectedPlayerId");
    window.dispatchEvent(new Event("playerIdChanged"));
    router.push("/choose");
  };

  return (
    <Sidebar
      side="left"
      variant="inset"
      collapsible="none"
      className="h-screen"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-2">
              <p className="text-sm text-muted-foreground">Skift spiller</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SelectUser />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleResetPlayerId}
            >
              nulstil
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
