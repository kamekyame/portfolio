import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import HeaderMenu from "components/header-menu/header-menu";
import Footer from "components/footer/footer";

import "./global.scss";
import v from "components/variables.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content={v.colorPrimary} />
        <link rel="icon" href="/logo.svg" type="image/svg+xml"></link>
      </head>
      <body>
        <HeaderMenu />
        <main>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""} />
    </html>
  );
}

export const metadata: Metadata = {
  title: "Top - sztm-blog",
  description: "すずとものブログです",
  openGraph: {
    locale: "ja_JP",
    type: "website",
    siteName: "sztm-blog",
    images: ["ogp.jpg"],
  },
  twitter: {
    card: "summary",
    site: "@SuzuTomo2001",
  },
};
