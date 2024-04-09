import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactQueryClientProvider } from "./Components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Info",
  description: "Created by Marty D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ReactQueryClientProvider>
            {children}
          </ReactQueryClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
