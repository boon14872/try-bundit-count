import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["400", "600"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Bundit Counter",
  description: "Bundit Counter for counting bundit ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sarabun.className}>{children}</body>
    </html>
  );
}
