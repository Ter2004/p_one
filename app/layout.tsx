import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My App",
  description: "Welcome to My App, powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50 text-gray-900`}
      >
        {/* Header */}
        <header className="bg-black text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-black !text-black">
              <a href="/" aria-label="Navigate to Home">
                SneakTer Store
              </a>
            </h1>
            {/* Removed Navigation */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} SneakTer Store. All rights reserved.
            </p>
            <nav aria-label="Footer Navigation" className="mt-2">
              <a href="/privacy" className="hover:underline px-2">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:underline px-2">
                Terms of Service
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
