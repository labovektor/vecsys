import AppNavigation from "./AppNavigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppNavigation>{children}</AppNavigation>;
}
