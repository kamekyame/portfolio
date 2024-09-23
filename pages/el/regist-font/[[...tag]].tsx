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
  Divider,
  ListItemButton,
} from "@mui/material";
import { RestEndpointMethodTypes } from "@octokit/rest";

import Title from "../../../components/title";
import GithubMd from "../../../components/GithubMd";
import Link from "../../../src/link";
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
  const gh = new GithubClient("kamekyame", "electone-regist-font");

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
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const isLatest = useMemo(() => {
    if ("tag" in router.query) return false;
    return true;
  }, [router.query]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: (t) => t.palette.background.default,
        color: (t) => t.palette.text.primary,
      }}
    >
      <Title
        name="Electone Regist Font"
        description="エレクトーンの楽譜によく使用されている レジストを表す画像 をフォントとして作ってみました"
        thumbnailUrl="img/ogp/electone-regist-font.png"
        twitterCard="summary_large_image"
      />
      <Typography variant="h1">Electone Regist Font</Typography>

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
                  sx={{
                    py: 4,
                    minWidth: "max-content",
                    textAlign: "center",
                    textTransform: "none",
                  }}
                  href={asset.browser_download_url}
                >
                  ダウンロード
                  <br />
                  {asset.name}
                </Button>
              );
            })}

            {tags.length >= 2 && (
              <>
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
                        <ListItemButton
                          key={t}
                          onClick={() => setDialogOpen(false)}
                        >
                          {t}
                          {i === 0 ? "(Latest)" : ""}
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Dialog>
              </>
            )}
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
  );
};

export default Home;