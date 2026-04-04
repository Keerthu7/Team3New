import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "About Us | Team 3 Associates",
  description: "Excellence in Architecture, Interior Design & Structural Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="scroll-smooth">
      <div className="font-body antialiased">
        {children}
      </div>
    </div>
  );
}
