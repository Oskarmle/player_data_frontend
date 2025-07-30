import "./globals.css";
import ClientProviders from "@/providers/client-provider";
import PlayerGate from "@/components/player-gate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html>
    <html lang="en" className="dark">
      <body className="bg-background h-screen">
        <PlayerGate>{children}</PlayerGate>
        {/* <ClientProviders>{children}</ClientProviders> */}
      </body>
    </html>
  );
}
