"use client";
import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const MobileNav = () => {
  return (
    <NavigationMenu className="min-w-full shadow-md bg-[var(--color-card)] border-1 border-[var(--color-border)] rounded-r-lg px-2">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="font-medium text-xl hover:text-blue-600 underline underline-offset-4"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/player"
              className="font-medium text-xl hover:text-blue-600 underline underline-offset-4"
            >
              Dine kampe
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/games"
              className="font-medium text-xl hover:text-blue-600 underline underline-offset-4"
            >
              Head-2-Head
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MobileNav;
