import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import UserButton from "@/features/dashboard/components/user-button";
import AuthContextProvider from "@/provider/auth-provider";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className=" w-full">
          <header className="px-5 py-3 flex gap-4 items-center justify-between border-b">
            <SidebarTrigger />

            <UserButton />
          </header>

          <div className=" p-4 w-full">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </main>
      </SidebarProvider>
    </AuthContextProvider>
  );
}
