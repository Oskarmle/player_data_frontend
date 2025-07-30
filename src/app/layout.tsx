import "./globals.css";
import ClientProviders from "@/providers/client-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html>
    <html lang="en">
      <body className="bg-background h-screen">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
