import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header.js";
import { Footer } from "./components/footer.js";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dan's Computer Repair",
  description: "Tech services provided to you by Dan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-black`}
      >
        {/* Header displayed on every page */}
        <Header />

        {/* Loading Main page content and to fill space */}
        <main className="flex-grow">{children}</main>

        {/* To have Footer displayed on every page */}
        <Footer />
      </body>
    </html>
  );
}
