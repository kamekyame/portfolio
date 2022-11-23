import React, { useMemo } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Box, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";
import DOMParserReact from "dom-parser-react";

import Title from "../../components/title";
import { client, IBlog } from "../../src/microCms";
import Link from "../../src/link";
import { createTheme } from "../../src/theme";

const parser: React.ComponentProps<typeof DOMParserReact>["components"] = {
  a: ({ href, children }) => {
    return (
      <Link href={href} color="inherit">
        {children}
      </Link>
    );
  },
  img: ({ src, ...props }) => {
    return (
      <Box
        component="img"
        sx={{
          objectFit: "contain",
          width: "90%",
          mx: "auto",
          my: 1,
          display: "block",
        }}
        src={src}
        alt="image"
      />
    );
  },
  figure: ({ children }) => <>{children}</>,
};

const Page: NextPage<{ data: IBlog }> = ({ data }) => {
  const theme = useMemo(() => createTheme("light"), []);
  return (
    <ThemeProvider theme={theme}>
      <Title
        name={`${data.title}`}
        thumbnailUrl={`api/blog/ogp?title=${encodeURIComponent(data.title)}`}
        type="article"
        twitterCard="summary_large_image"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (t) => t.palette.background.default,
          color: (t) => t.palette.text.primary,
          py: 3,
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1000px",
          }}
        >
          <Box
            component="h1"
            sx={{
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              p: 1,
              borderBottom: (t) => `3px dashed ${t.palette.secondary.main}`,
            }}
          >
            {data.title}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "end",
              flexWrap: "wrap",
              fontSize: "0.8em",
              lineHeight: "1.7em",
            }}
          >
            <Box>
              公開日：{dayjs(data.publishedAt).format("YYYY/MM/DD HH:mm")}
            </Box>
            <Box>
              最終更新日：{dayjs(data.updatedAt).format("YYYY/MM/DD HH:mm")}
            </Box>
          </Box>
          {data.body.map((field, i) => {
            return (
              <Box
                key={i}
                component={DOMParserReact}
                source={field.content}
                components={parser}
              ></Box>
            );
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { data: IBlog },
  { id: string }
> = async (ctx) => {
  const id = ctx.params?.id;
  try {
    const data = await client.get({ endpoint: "blog", contentId: id });
    return { props: { data } };
  } catch (_) {
    return { notFound: true };
  }
};

export default Page;
