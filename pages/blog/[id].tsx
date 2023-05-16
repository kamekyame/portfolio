import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";

import TwitterIcon from "@mui/icons-material/Twitter";

import Title from "../../components/title";
import { client, IBlog } from "../../src/microCms";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!("attribs" in domNode)) return domNode;
    if (domNode.name === "img") {
      return (
        <Box
          component="img"
          sx={{
            objectFit: "contain",
            maxWidth: "90%",
            mx: "auto",
            display: "block",
          }}
          src={domNode.attribs.src}
          alt="image"
        />
      );
    } else if (domNode.name === "blockquote") {
      // classが定義されている場合、埋め込みコンテンツの場合があるためそのまま返す（ツイッターなど）
      if (domNode.attribs.class !== undefined)
        return <>{domToReact([domNode])}</>;
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
          {domToReact(domNode.children)}
        </Box>
      );
    } else if (domNode.name === "iframe") {
      let aspectRatio: string | undefined = undefined;
      if (domNode.attribs.title === "YouTube embed") {
        aspectRatio = `${domNode.attribs.width} / ${domNode.attribs.height}`;
      }
      return (
        <Box
          sx={{
            position: "relative",
            aspectRatio: aspectRatio,
            maxWidth: domNode.attribs.width + "px",
            "& iframe": {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            },
          }}
        >
          {domToReact([domNode])}
        </Box>
      );
    }
    // console.log(domNode.name);
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
          return <Box key={i}>{parse(field.content, parserOptions)}</Box>;
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
    return { props: { data }, revalidate: 60 };
  } catch (_) {
    return { notFound: true };
  }
};

export default Page;
