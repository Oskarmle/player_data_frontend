import "./globals.css";
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
          <UsersProvider>{children}</UsersProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
