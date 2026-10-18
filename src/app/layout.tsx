import type { Metadata } from "next";
import { Outfit, Inter, Montserrat, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const TITLE = "Omkar Enterprises | Branding, Signage & Retail Display Solutions";
const DESCRIPTION =
  "17 years of signage, channel letters, facades, window displays, mall activations and trade show builds for leading brands across India.";

// The link preview uses the small square app/opengraph-image.jpg, so chat apps show it as a
// thumbnail beside the text rather than a full-width banner. On Vercel, Next.js fills in the
// production domain for its address, so previews keep working when the domain changes.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Omkar Enterprises",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Next.js 15 uses a special LayoutProps type for the children
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${montserrat.variable} ${playfair.variable} ${dancing.variable}`}
    >
      <body className="antialiased min-h-full flex flex-col">{children}</body>
    </html>
  );
}
