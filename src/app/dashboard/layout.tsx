import AppNavigation from "./AppNavigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppNavigation>{children}</AppNavigation>
      </body>
    </html>
  );
}
