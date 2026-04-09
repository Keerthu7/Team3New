import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Team3 Associates",
  description: "Healing Spaces and Premium Architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
       <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}