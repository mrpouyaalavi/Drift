import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drift — Daily Spend Optimizer",
  description:
    "See the annual rewards value you may be missing by spending on debit instead of an eligible rewards card.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
