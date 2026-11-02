import type { Metadata } from "next";
import { Big_Shoulders, Inter_Tight, Syne } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: "900",
});

export const metadata: Metadata = {
  title: "Johnfred | Graphic Designer",
  description:
    "Johnfred is a graphic designer creating bold social media graphics, brand identities and clean UI that help brands stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${syne.variable} ${bigShoulders.variable}`}>
      <body>{children}</body>
    </html>
  );
}
