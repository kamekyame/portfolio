import { useMemo } from "react";
import { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import { ThemeProvider } from "@mui/material/styles";
import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";

import Title from "../../components/title";
import { client } from "../../src/microCms";
import Link from "../../src/link";
import { createTheme } from "../../src/theme";

type Content = {
  url: string;
  title: string;
  updatedAt: string;
  type: "qiita" | "blog";
};

const Page: NextPage<{
  contents: Content[];
}> = ({ contents }) => {
  const theme = useMemo(() => createTheme("light"), []);

  // page処理をやめたため、このコードは不要になった
  // const nowPage = useMemo(
  //   () => data.offset / data.limit,
  //   [data.offset, data.limit]
  // );

  // const prevPage = useMemo(() => {
  //   const prevPage = nowPage - 1;
  //   return prevPage < 0 ? undefined : prevPage;
  // }, [nowPage]);

  // const nextPage = useMemo(() => {
  //   const nextPage = nowPage + 1;
  //   return nextPage * data.limit > data.totalCount ? undefined : nextPage;
  // }, [nowPage, data.totalCount, data.limit]);

  return (
    <ThemeProvider theme={theme}>
      <Title name="blog" />

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
        <Typography variant="title" color="">
          BLOG
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "90%",
            maxWidth: "1000px",
          }}
        >
          {contents.map((blog) => {
            return (
              <Card key={blog.url}>
                <CardActionArea sx={{ height: "100%" }}>
                  <Link href={blog.url} color="inherit" underline="none">
                    <CardContent
                      sx={{
                        display: "grid",
                        height: "100%",
                        gridTemplateColumns: "25px 1fr",
                        gridTemplateRows: "minmax(25px,1fr) min-content",
                        gap: 1,
                        p: 2,
                        "&:last-child": { pb: 2 },
                      }}
                    >
                      {blog.type === "qiita" && (
                        <Box
                          sx={{
                            gridColumn: "1 / 2",
                            position: "relative",
                            aspectRatio: "1",
                          }}
                        >
                          <Image
                            src="/qiita.png"
                            alt="Qiita favicon"
                            fill
                            // width="25"
                            // height="25"
                          ></Image>
                        </Box>
                      )}
                      <Box
                        sx={{
                          gridColumn: "2 / -1",
                          display: "flex",
                          alignItems: "center",
                          m: 0,
                          gap: 1,
                        }}
                        component="h3"
                      >
                        {blog.title}
                        {blog.type !== "blog" && (
                          <OpenInNewIcon fontSize="small" />
                        )}
                      </Box>
                      <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
                        最終更新日：
                        {dayjs(blog.updatedAt).format("YYYY/MM/DD HH:mm")}
                      </Box>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
        {
          // page処理をやめたため、このコードは不要になった
          /* <Box sx={{ m: 2, display: "flex", gap: 3 }}>
          {prevPage !== undefined && (
            <Link
              href={{ pathname: "/blog", query: { page: prevPage } }}
              color="inherit"
              underline="none"
              sx={{ display: "flex" }}
            >
              <ArrowBackIcon />
              前のページ
            </Link>
          )}
          {nextPage !== undefined && (
            <Link
              href={{ pathname: "/blog", query: { page: nextPage } }}
              color="inherit"
              underline="none"
              sx={{ display: "flex" }}
            >
              次のページ
              <ArrowForwardIcon />
            </Link>
          )}
        </Box> */
        }
      </Box>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contents: Content[] = [];

  const microCmsData = await client.get({
    endpoint: "blog",
    queries: {
      limit: Number.MAX_SAFE_INTEGER,
      fields: "id,title,updatedAt",
    },
  });
  if (Array.isArray(microCmsData.contents)) {
    microCmsData.contents.forEach((c: any) => {
      contents.push({
        url: `/blog/${c.id}`,
        title: c.title,
        updatedAt: c.updatedAt,
        type: "blog",
      });
    });
  }

  const qiitaUrl = new URL("https://qiita.com/api/v2/items");
  const sp = qiitaUrl.searchParams;
  sp.set("query", "user:SuzuTomo2001");
  const qiitaRes = await fetch(qiitaUrl);
  const qiitaJson = await qiitaRes.json();
  if (Array.isArray(qiitaJson)) {
    qiitaJson.forEach((c) => {
      contents.push({
        title: c.title,
        url: c.url,
        updatedAt: c["updated_at"],
        type: "qiita",
      });
    });
  }
  console.log(contents);

  contents.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return { props: { contents }, revalidate: 120 };
};

export default Page;
