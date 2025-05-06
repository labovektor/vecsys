import UserButton from "@/features/participant-administration/components/user-button";
import { VIcons } from "@/lib/asset";
import ParticipantAuthContextProvider from "@/provider/participant-auth-provider";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ParticipantAuthContextProvider>
      <main className=" w-full">
        <header className="px-5 py-3 flex gap-4 text-white items-center justify-between border-b bg-vblue-900">
          <Image src={VIcons.dark} width={140} height={32} alt="logo" />
          Olimpiade Matematika Vektor Nasional (OMVN) Tahun 2026
          <UserButton />
        </header>

        <div className=" p-4 w-full">{children}</div>
      </main>
    </ParticipantAuthContextProvider>
  );
}
