import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/providers/SessionProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prop Value",
  description: "Estimate property values in DHA Multan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}

          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
              duration: 3000,

              style: {
                borderRadius: "12px",
                background: "#123A6D",
                color: "#fff",
                padding: "16px",
              },

              success: {
                iconTheme: {
                  primary: "#F97316",
                  secondary: "#fff",
                },
              },

              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}