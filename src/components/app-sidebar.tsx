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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SelectUser />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
