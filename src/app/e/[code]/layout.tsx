import ParticipantContextProvider from "@/provider/participant-page-provide";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ParticipantContextProvider>
      {children}
    </ParticipantContextProvider>
  );
}