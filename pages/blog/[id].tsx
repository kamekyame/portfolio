import React, { useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import { Typography, Box, ThemeProvider } from "@mui/material";
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
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Box
          component="img"
          sx={{ objectFit: "contain", width: "100%" }}
          src={src}
          alt="image"
        />
      </Box>
    );
  },
  figure: ({ children }) => <>{children}</>,
};

const Page: NextPage<{ data: IBlog }> = ({ data }) => {
  const theme = useMemo(() => createTheme("light"), []);
  return (
    <ThemeProvider theme={theme}>
      <Title name={`${data.title}`} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (t) => t.palette.background.default,
          color: (t) => t.palette.text.primary,
          pb: 3,
        }}
      >
        <Typography variant="title">{data.title}</Typography>
        <Box
          sx={{
            width: "90%",
            maxWidth: "1000px",
            lineHeight: "1.7em",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "end",
              fontSize: "0.8em",
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Array.isArray(ctx.query.id) ? ctx.query.id[0] : ctx.query.id;
  let data = null;
  if (id) {
    data = await client.get({ endpoint: "blog", contentId: id });
  }
  if (data === null) return { notFound: true };
  return { props: { data } };
};

export default Page;
