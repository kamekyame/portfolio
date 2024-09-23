import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { GoogleAnalytics } from "nextjs-google-analytics";

import theme from "../src/theme";
import Header from "../components/header";
import Footer from "../components/footer";

import "./font.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <GoogleAnalytics trackPageViews />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </div>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
