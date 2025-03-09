"use client";

import {
  HistoryIcon,
  HomeIcon,
  JoystickIcon,
  PersonStandingIcon,
  UserIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { VIcons } from "@/lib/asset";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Menu items.
const menus = [
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

export function AppSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar color="primary" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Image src={VIcons.noTitle} width={32} height={32} alt="logo" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">VecSys</span>
                <span className="truncate text-xs">Event Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>VecSys</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={
                      pathName === "/dashboard"
                        ? pathName === item.path
                        : pathName.startsWith(item.path) &&
                          item.path !== "/dashboard"
                    }
                    asChild
                  >
                    <a href={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
