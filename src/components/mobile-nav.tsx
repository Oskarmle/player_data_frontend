"use client";
import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileFooter from "./mobile-footer";

const MobileNav = () => {
  return (
    <NavigationMenu className="min-w-full flex flex-col shadow-md bg-[var(--color-card)] border-1 border-[var(--color-border)] rounded-lg px-2">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="font-medium text-l hover:text-blue-600 underline underline-offset-2"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/player"
              className="font-medium text-l hover:text-blue-600 underline underline-offset-2"
            >
              Dine kampe
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/games"
              className="font-medium text-l hover:text-blue-600 underline underline-offset-2"
            >
              Head-2-Head
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="border-t w-full">
        <MobileFooter />
      </div>
    </NavigationMenu>
  );
};

export default MobileNav;
