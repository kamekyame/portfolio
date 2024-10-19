"use client";

import HeaderMenu from "components/header-menu/header-menu";
import Footer from "components/footer/footer";

import "./desttyle.css";
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
    </html>
  );
}
