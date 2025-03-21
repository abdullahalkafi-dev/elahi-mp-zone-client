import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import AppProvider from "@/provider/appProvider";
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moriom Print Zone",
  description: "Moriom Print Zone Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/jsm-logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
          {children}
          <ToastContainer />
          </AppProvider>
      
        </ThemeProvider>
      </body>
    </html>
  );
}
