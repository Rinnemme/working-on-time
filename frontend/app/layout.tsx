import type { Metadata } from "next";
import Navbar from "../src/components/navbar/navbar";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "../src/store/provider";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Working On Time",
  description: "Personal project management, simplified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ProjectProvider>
          <Navbar />
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
