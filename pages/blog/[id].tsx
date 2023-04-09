import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import DOMParserReact from "dom-parser-react";

import TwitterIcon from "@mui/icons-material/Twitter";

import Title from "../../components/title";
import { client, IBlog } from "../../src/microCms";
import Link from "../../src/link";

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
  strong: ({ children }) => {
    return <Box component="strong">{children}</Box>;
  },
  blockquote: ({ children }) => {
    return (
      <Box
        component="blockquote"
        sx={{
          m: 1,
          p: 1,
          pl: 2,
          backgroundColor: "#E0E0E0",
          borderLeft: (t) => `3px solid ${t.palette.primary.main}`,
        }}
      >
        {children}
      </Box>
    );
  },
  figure: ({ children }) => <>{children}</>,
  h4: ({ children }) => {
    return (
      <Box component="h4" sx={{ my: 1 }}>
        {children}
      </Box>
    );
  },
  h5: ({ children }) => {
    return (
      <Box component="h5" sx={{ my: 0.5 }}>
        {children}
      </Box>
    );
  },
  p: ({ children }) => {
    return (
      <Box component="p" sx={{ my: 0.5 }}>
        {children}
      </Box>
    );
  },
};

const Page: NextPage<{ data: IBlog }> = ({ data }) => {
  return (
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
      <Title
        name={`${data.title}`}
        thumbnailUrl={`api/blog/ogp?title=${encodeURIComponent(data.title)}`}
        type="article"
        twitterCard="summary_large_image"
      />
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <TwitterIcon
              onClick={() => {
                const url = new URL("https://twitter.com/intent/tweet");
                const sp = url.searchParams;
                sp.set("url", location.href);
                sp.set("text", `${data.title} - sztm-blog`);
                sp.set("hashtags", "sztm_blog");

                window.open(url.href, "_blank");
              }}
            />
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
  let draftKey: string | undefined;
  if (
    ctx.preview &&
    typeof ctx.previewData === "object" &&
    "draftKey" in ctx.previewData &&
    typeof ctx.previewData.draftKey === "string"
  ) {
    draftKey = ctx.previewData.draftKey;
  }

  try {
    const data = await client.get({
      endpoint: "blog",
      contentId: id,
      queries: { draftKey },
    });
    return { props: { data } };
  } catch (_) {
    return { notFound: true };
  }
};

export default Page;
