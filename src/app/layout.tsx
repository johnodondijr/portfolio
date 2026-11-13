import type { Metadata } from "next";
import { Exo, Inter_Tight, Syne } from "next/font/google";
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

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: "500",
});

const title = "Johnfred | Graphic Designer";
const description =
  "Johnfred is a graphic designer creating bold social media graphics, brand identities and clean UI that help brands stand out.";

// The share image itself lives next to this file (opengraph-image.jpg / twitter-image.jpg).
export const metadata: Metadata = {
  metadataBase: new URL("https://johnfred.vercel.app"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Johnfred",
    title,
    description,
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${syne.variable} ${exo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
