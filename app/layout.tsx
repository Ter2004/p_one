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
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">
              <a href="/" aria-label="Navigate to Home">
                My App
              </a>
            </h1>
            <nav aria-label="Main Navigation">
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:underline" aria-current="page">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} My App. All rights reserved.
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
