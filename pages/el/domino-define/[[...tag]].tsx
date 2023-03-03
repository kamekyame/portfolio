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
import { RestEndpointMethodTypes } from "@octokit/rest";

import Title from "../../../components/title";
import GithubMd from "../../../components/GithubMd";
import Link from "../../../src/link";
import { createTheme } from "../../../src/theme";
import { GithubClient } from "../../../src/octokit";

type Props = {
  readmeHtml: string;
  tag: string;
  releaseNoteHtml: string;
  tags: string[];
  release: RestEndpointMethodTypes["repos"]["listReleases"]["response"]["data"][number];
};

export const getStaticPaths: GetStaticPaths<{ tag: string[] }> = async () => {
  return {
    paths: [{ params: { tag: [] } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, { tag: string[] }> = async (
  ctx
) => {
  const gh = new GithubClient("kamekyame", "el-domino_define");

  const paramTag = ctx.params?.tag?.[0];

  const releases = await gh.listReleases();

  const release = paramTag
    ? releases.find((r: any) => r.tag_name === paramTag)
    : releases[0];

  if (!release) return { notFound: true };

  const tag = release.tag_name;
  gh.setTag(tag);

  const readme = await gh.getFileContent("README.md");
  if (!readme) return { notFound: true };
  const readmeHtml = await gh.renderMarkdown(readme);

  const releaseNoteHtml = await gh.renderMarkdown(release.body ?? "");

  return {
    props: {
      release,
      readmeHtml,
      tag,
      releaseNoteHtml,
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

  return (
    <ThemeProvider theme={theme}>
      <Title name="Domino用 Electone音源定義ファイル" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (t) => t.palette.background.default,
          color: (t) => t.palette.text.primary,
        }}
      >
        <Typography variant="title">Domino用音源定義ファイル</Typography>

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
              {release.assets.map((asset: any) => {
                return (
                  <Button
                    key={asset.id}
                    variant="contained"
                    sx={{ py: 4, minWidth: "max-content", textAlign: "center" }}
                    href={asset.browser_download_url}
                  >
                    ダウンロード
                    <br />
                    {asset.name}
                  </Button>
                );
              })}

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
            <Box sx={{ fontSize: "80%", flexGrow: 1 }}>
              <GithubMd html={releaseNoteHtml} />
            </Box>
          </Box>
          <Divider textAlign="left" sx={{ my: 2 }}>
            README
          </Divider>
          <GithubMd html={readmeHtml}></GithubMd>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
