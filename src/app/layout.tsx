import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://drift-daily-spend-optimizer.vercel.app";
const title = "Drift — Daily Spend Optimizer";
const description =
  "A financial decision-support app for modelling spending scenarios and annual net benefit.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Drift",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
