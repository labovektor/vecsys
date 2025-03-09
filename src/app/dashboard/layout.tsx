import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import UserButton from "@/features/dashboard/components/user-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full">
        <header className="px-5 py-3 flex gap-4 items-center justify-between border-b">
          <SidebarTrigger size="icon" />

          <UserButton />
        </header>

        <div className=" p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
