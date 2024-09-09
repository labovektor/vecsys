"use client";

import { Nav } from "@/components/nav";
import {
  HistoryIcon,
  HomeIcon,
  JoystickIcon,
  LucideIcon,
  PersonStandingIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import TopBar from "./TopBar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuProps {
  title: string;
  icon: LucideIcon;
  path: string;
}

const AppNavigation = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathName = usePathname();

  const handleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menus: MenuProps[] = [
    {
      title: "Beranda",
      icon: HomeIcon,
      path: "/dashboard",
    },
    {
      title: "Kelola Event",
      icon: JoystickIcon,
      path: "/dashboard/event",
    },
    {
      title: "Kelola Peserta",
      icon: PersonStandingIcon,
      path: "/dashboard/participant",
    },
    {
      title: "Riwayat Aktifitas",
      icon: HistoryIcon,
      path: "/dashboard/history",
    },
    {
      title: "Profil Saya",
      icon: UserIcon,
      path: "/dashboard/profile",
    },
  ];
  return (
    <div className=" h-svh flex flex-col">
      <TopBar onClick={handleCollapsible} />
      <div className=" flex-1 flex overflow-hidden">
        <div
          className={cn(
            " bg-primary w-20 transition-all py-4 px-2 flex flex-col justify-between",
            !isCollapsed && "w-64"
          )}
        >
          <Nav
            links={menus.map((menu) => ({
              title: menu.title,
              icon: menu.icon,
              path: menu.path,
              active:
                pathName === "/dashboard"
                  ? pathName === menu.path
                  : pathName.startsWith(menu.path) &&
                    menu.path !== "/dashboard",
            }))}
            isCollapsed={isCollapsed}
          />
          {!isCollapsed && (
            <span className=" text-white text-center">
              &#169; 2024 | VecSys by HIMATIKA Vektor
            </span>
          )}
        </div>
        <div className=" p-5 w-full flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AppNavigation;
