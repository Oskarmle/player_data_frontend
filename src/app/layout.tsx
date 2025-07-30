import "./globals.css";
import PlayerGate from "@/components/player-gate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background h-screen">
        <PlayerGate>{children}</PlayerGate>
      </body>
    </html>
  );
}
