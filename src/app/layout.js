import { Inter } from "next/font/google";
import "./globals.css";
import Waves from "./components/Waves";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scallywag Scanner",
  description: "Be yer cyberscrolls marked by hornswaggle?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
