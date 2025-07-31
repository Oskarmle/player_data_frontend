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
    <NavigationMenu className="min-w-full shadow-md bg-amber-50 rounded-sm">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="font-medium text-lg text-xl text-black hover:text-blue-600 font-black"
            >
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/player"
              className="font-medium text-lg text-xl text-black hover:text-blue-600 font-black"
            >
              Dine kampe
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/games"
              className="font-medium text-lg text-xl text-black hover:text-blue-600 font-black"
            >
              Sammenlign kampe
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MobileNav;
