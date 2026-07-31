import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bom de Pesca",
  description: "Participe da nossa comunidade no WhatsApp e tenha acesso a novidades e promoções exclusivas.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.bomdepesca.com.br",
    title: "Bom de Pesca | Comunidade Exclusiva",
    description: "Acesse novidades e promoções direto no seu WhatsApp.",
    images: [
      {
        url: "/images/logo.webp",
        width: 800,
        height: 600,
        alt: "Logotipo Bom de Pesca",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}