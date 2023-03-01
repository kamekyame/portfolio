import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Header from "../components/header";
import Footer from "../components/footer";

import "./font.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
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
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: "1", width: "100%" }}>
              <Component {...pageProps} />
            </Box>
          </Box>
          <Footer />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
