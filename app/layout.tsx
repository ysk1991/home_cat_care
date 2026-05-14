import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const displaySerif = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodySans = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "喂猫到家 · 上门喂猫服务",
  description:
    "上门喂猫、清洁猫砂、互动陪伴、健康观察，一次服务完成。适合出差、旅行和节假日临时托管需求。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${displaySerif.variable} ${bodySans.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
