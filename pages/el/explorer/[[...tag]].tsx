import React, { useMemo } from "react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Divider,
  ThemeProvider,
} from "@mui/material";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

import Title from "../../../components/title";
import Link from "../../../src/link";
import { createTheme } from "../../../src/theme";

type Props = {
  readmeHtml: string;
  tag: string;
  releaseNoteHtml: string;
  tags: string[];
  release: RestEndpointMethodTypes["repos"]["listReleases"]["response"]["data"][number];
};

const repo = { owner: "kamekyame", repo: "el-explorer" };

async function getReleases() {
  const res = await new Octokit().rest.repos.listReleases(repo);
  return res.data;
}

export const getStaticPaths: GetStaticPaths<{ tag: string[] }> = async () => {
  return {
    paths: [{ params: { tag: [] } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const paramTag = Array.isArray(ctx.params?.tag)
    ? ctx.params?.tag[0]
    : ctx.params?.tag;

  const releases = await getReleases();

  const release = paramTag
    ? releases.find((r: any) => r.tag_name === paramTag)
    : releases[0];

  if (release === undefined) {
    return { notFound: true };
  }
  const tag = release.tag_name;
  const a = await new Octokit().rest.repos.getContent({
    ...repo,
    path: "README.md",
    ref: tag,
  });
  if (Array.isArray(a.data)) return { notFound: true };
  const content = a.data.type === "file" ? a.data.content : "";
  const readme = Buffer.from(content, "base64").toString();
  const readmeHtml = await new Octokit().rest.markdown.render({ text: readme });

  const releaseNoteHtml = await new Octokit().rest.markdown.render({
    text: release.body ?? "",
  });

  return {
    props: {
      release: release,
      readmeHtml: readmeHtml.data,
      tag,
      releaseNoteHtml: releaseNoteHtml.data,
      tags: releases.map((r: any) => r.tag_name),
    },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({
  readmeHtml,
  tag,
  releaseNoteHtml,
  tags,
  release,
}) => {
  const theme = useMemo(() => createTheme("light"), []);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const isLatest = useMemo(() => {
    if ("tag" in router.query) return false;
    return true;
  }, [router.query]);

  const installer = useMemo(() => {
    const win = release.assets.find((asset) => {
      if (asset.name.endsWith(".msi")) return true;
      return false;
    });

    return {
      windows: win,
    };
  }, [release]);

  return (
    <ThemeProvider theme={theme}>
      <Title name="EL-Explorer" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (t) => t.palette.background.default,
          color: (t) => t.palette.text.primary,
        }}
      >
        <Typography variant="title">EL-Explorer</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "90%",
            mx: "auto",
            mb: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              p: 1,
              backgroundColor: "#FFE0E0",
              // backgroundColor: (t) => t.palette.primary.light,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                m: 2,
                width: "max-content",
              }}
            >
              <Typography variant="h5">{tag}</Typography>
              {installer.windows && (
                <Button
                  key={installer.windows.id}
                  variant="contained"
                  sx={{ py: 4, minWidth: "max-content", textAlign: "center" }}
                  href={installer.windows.browser_download_url}
                >
                  Windows版ダウンロード
                  <br />
                  {installer.windows.name}
                </Button>
              )}

              <Button
                variant="outlined"
                color="inherit"
                sx={{ py: 1, minWidth: "max-content" }}
                onClick={() => setDialogOpen(true)}
                size="small"
              >
                別バージョン
              </Button>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>バージョンを選択</DialogTitle>
                <List>
                  {tags.map((t, i) => (
                    <Link key={t} href={t} underline="none" color="inherit">
                      <ListItem
                        button
                        key={t}
                        onClick={() => setDialogOpen(false)}
                      >
                        {t}
                        {i === 0 ? "(Latest)" : ""}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Dialog>
              {isLatest === false && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ py: 1, minWidth: "max-content" }}
                  href="./"
                  size="small"
                >
                  Go to Latest
                </Button>
              )}
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: releaseNoteHtml }} />
          </Box>
          <Divider textAlign="left" sx={{ my: 2 }}>
            README
          </Divider>
          <Box
            sx={{
              "& h1": {
                display: "none",
              },
              "& h2, & h3, & h4": {
                my: 2,
              },
              "& p": {
                my: 1,
              },
              "& img": {
                maxWidth: "100%",
                maxHeight: "50vh",
              },
              "& table": {
                borderCollapse: "collapse",
              },
              "& td, & th": {
                border: "1px solid gray",
                p: 1,
              },
            }}
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
