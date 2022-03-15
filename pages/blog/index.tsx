import { useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import { ThemeProvider } from "@mui/material/styles";
import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";

import Title from "../../components/title";
import { client, IList, IBlog } from "../../src/microCms";
import Link from "../../src/link";
import { createTheme } from "../../src/theme";

const Page: NextPage<{ data: IList<IBlog> }> = ({ data }) => {
  const theme = useMemo(() => createTheme("light"), []);

  const nowPage = useMemo(
    () => data.offset / data.limit,
    [data.offset, data.limit]
  );

  const prevPage = useMemo(() => {
    const prevPage = nowPage - 1;
    return prevPage < 0 ? undefined : prevPage;
  }, [nowPage]);

  const nextPage = useMemo(() => {
    const nextPage = nowPage + 1;
    return nextPage * data.limit > data.totalCount ? undefined : nextPage;
  }, [nowPage, data.totalCount, data.limit]);

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
        <Box sx={{ m: 2 }}>
          古い記事は昔のブログから移行したものなので表示がおかしくなっているかもしれません。
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            width: "90%",
            maxWidth: "1000px",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(300px,100%), 1fr))",
            gridAutoRows: "1fr",
          }}
        >
          {data.contents.map((blog) => {
            return (
              <Card key={blog.id}>
                <CardActionArea sx={{ height: "100%" }}>
                  <Link
                    href={`/blog/${blog.id}`}
                    color="inherit"
                    underline="none"
                  >
                    <CardContent
                      sx={{
                        display: "grid",
                        height: "100%",
                        gridTemplateColumns: "1fr",
                        gridTemplateRows: "1fr min-content",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ flexGrow: "1", m: 0 }} component="h3">
                        {blog.title}
                      </Box>
                      <Box sx={{ fontSize: "0.8em" }}>
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
        <Box sx={{ m: 2, display: "flex", gap: 3 }}>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const limit = 10;
  const redirection = { redirect: { destination: "/blog" }, props: {} };
  const pages = ctx.query.page;

  if (pages && typeof pages !== "string") return redirection;

  const offset = pages ? parseInt(pages) * limit : 0;
  const data = await client.get({
    endpoint: "blog",
    queries: {
      offset,
      limit,
    },
  });
  if (data.totalCount < offset) return redirection;

  return { props: { data } };
};

export default Page;
