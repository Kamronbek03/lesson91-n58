import { Inter } from "next/font/google";
import Header from "@/components/header";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Where in the World?",
  description: "Explore countries across the globe.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
