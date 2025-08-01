"use client";
import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileSearch from "./mobile-search";

const MobileNav = () => {
  return (
    <NavigationMenu className="min-w-full flex flex-col shadow-md bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-2 items-start">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="font-medium text-l hover:text-blue-600"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/player"
              className="font-medium text-l hover:text-blue-600"
            >
              Dine kampe
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/games"
              className="font-medium text-l hover:text-blue-600"
            >
              Head-2-Head
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="border-t w-full">
        <MobileSearch />
      </div>
    </NavigationMenu>
  );
};

export default MobileNav;
