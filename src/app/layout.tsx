import "./globals.css";
import { PlayersProvider } from "./providers/player-provider";
import { QueryProvider } from "./providers/query-provider";
import { UsersProvider } from "./providers/user-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark">
      <body className="bg-background h-screen">
        <QueryProvider>
          <UsersProvider>
            <PlayersProvider>{children}</PlayersProvider>
          </UsersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
