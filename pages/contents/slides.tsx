import { NextPage, GetStaticProps } from "next";
import { Typography, Box } from "@mui/material";

import Title from "../../components/title";
import { client } from "../../src/microCms";
import { logger } from "../../src/logger";

type SlideContent = {
  html: string;
};

const Page: NextPage<{
  contents: SlideContent[];
}> = ({ contents }) => {
  return (
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
      <Title name="blog" />
      <Typography variant="h1" color="">
        SLIDES
      </Typography>
      <Box sx={{ py: 2 }}>
        これまでのカンファレンスなどにおける発表資料をまとめています
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        {contents.map((slide, index) => {
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: slide.html }}
            ></div>
          );
        })}
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contents: SlideContent[] = [];

  if (client) {
    const microCmsData = await client.get({
      endpoint: "slides",
      queries: {
        limit: Number.MAX_SAFE_INTEGER,
        fields: "slideUrl",
      },
    });
    if (Array.isArray(microCmsData.contents)) {
      const promises = microCmsData.contents.map(async (c: any) => {
        const slideUrl = c.slideUrl;
        const ombedUrl = new URL(`https://speakerdeck.com/oembed.json`);
        ombedUrl.searchParams.append("url", slideUrl);
        return fetch(ombedUrl)
          .then((res) => res.json())
          .then((ombedData) => {
            const data: SlideContent = {
              html: ombedData.html,
            };
            return data;
          });
      });
      contents.push(...(await Promise.all(promises)));
    }
  } else {
    logger.error(
      `MicroCMS client is not initialized: スライド一覧になにも表示されなくなります`
    );
  }

  return { props: { contents }, revalidate: 120 };
};

export default Page;
