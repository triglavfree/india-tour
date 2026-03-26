import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://india-journey.ru"),
  title: "Неизвестные сокровища Индии | Духовное путешествие 2026",
  description: "Духовное путешествие в Индию — Ришикеш, Бадринатх, Вриндаван. 27 апреля — 9 мая 2026. Йога, омовение в Ганге, древние храмы. 13 волшебных дней в колыбели йоги у подножия Гималаев. Тур организован опытными гидами с 25-летним опытом.",
  keywords: ["Индия", "Ришикеш", "Бадринатх", "Вриндаван", "йога", "путешествие", "тур", "Ганг", "Гималаи", "духовное путешествие", "паломничество", "ашрам", "медитация", "йога тур", "Индия 2026"],
  authors: [{ name: "Тур в Индию" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Неизвестные сокровища Индии | Духовное путешествие 2026",
    description: "13 волшебных дней в колыбели йоги — Ришикеш, Бадринатх, Вриндаван. Йога, омовение в Ганге, древние храмы.",
    type: "website",
    url: "https://india-journey.ru",
    siteName: "Тур в Индию",
    locale: "ru_RU",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1440,
        height: 720,
        alt: "Духовное путешествие в Индию",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Неизвестные сокровища Индии",
    description: "Духовное путешествие в Индию — Ришикеш, Бадринатх, Вриндаван. 27 апреля — 9 мая 2026.",
    images: ["/images/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://india-journey.ru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a1510" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
