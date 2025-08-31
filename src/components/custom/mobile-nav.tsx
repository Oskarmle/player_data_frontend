import React from "react";
import { Card } from "../ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Card className="p-2">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Hjem</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/games">Kamp oversigt</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default MobileNav;
