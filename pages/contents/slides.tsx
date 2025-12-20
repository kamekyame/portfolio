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
      <Title name="slides" />
      <Typography variant="h1">SLIDES</Typography>
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
      const promises = microCmsData.contents.flatMap(async (c: any) => {
        const slideUrl = c.slideUrl;
        const oembedUrl = new URL(`https://speakerdeck.com/oembed.json`);
        oembedUrl.searchParams.append("url", slideUrl);
        return fetch(oembedUrl)
          .then((res) => res.json())
          .then((oembedData) => {
            const data: SlideContent = {
              html: oembedData.html,
            };
            return data;
          })
          .catch((err) => {
            return undefined;
          });
      });
      contents.push(
        ...(await Promise.all(promises)).filter(
          (c): c is SlideContent => c !== undefined
        )
      );
    }
  } else {
    logger.error(
      `MicroCMS client is not initialized: スライド一覧になにも表示されなくなります`
    );
  }

  return { props: { contents }, revalidate: 120 };
};

export default Page;
