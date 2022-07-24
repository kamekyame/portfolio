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
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import Title from "../../../components/title";
import Link from "../../../src/link";
import { createTheme } from "../../../src/theme";

type Props = {
  readme: string;
  tag: string;
  releaseNote: string;
  tags: string[];
  release: any;
};

const components: Components = {
  h1: () => <></>,
};

const baseUrl = "https://api.github.com/repos/kamekyame/el-domino_define";

async function getReleases() {
  let url = `${baseUrl}/releases`;
  const res = await fetch(url);
  if (res.ok === false) return;
  const json = await res.json();
  return json;
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

  // const release = await getRelease(ctx.params?.tag);
  if (release === undefined) {
    return { notFound: true };
  }
  const tag = release.tag_name;
  const res = await fetch(`${baseUrl}/contents/README.md?ref=${tag}`);
  const data = await res.json();
  const readme = Buffer.from(data.content, "base64").toString();
  return {
    props: {
      release: release,
      readme: readme,
      tag,
      releaseNote: release.body,
      tags: releases.map((r: any) => r.tag_name),
    },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({ readme, tag, releaseNote, tags, release }) => {
  const theme = useMemo(() => createTheme("light"), []);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const transformImageUrl = React.useCallback<
    NonNullable<React.ComponentProps<typeof ReactMarkdown>["transformImageUri"]>
  >(
    (src, _alt, _title) => {
      const newSrc = `https://raw.githubusercontent.com/kamekyame/el-domino_define/${tag}/${src}`;
      return newSrc;
    },
    [tag]
  );

  const isLatest = useMemo(() => {
    if ("tag" in router.query) return false;
    return true;
  }, [router.query]);

  return (
    <ThemeProvider theme={theme}>
      <Title name="Domino音源定義ファイル" />

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
                  // onClick={() => setDialogOpen(true)}
                  size="small"
                >
                  Go to Latest
                </Button>
              )}
            </Box>
            <Box
              component={ReactMarkdown}
              remarkPlugins={[[remarkGfm]]}
              components={components}
              sx={{ fontSize: "80%" }}
            >
              {releaseNote}
            </Box>
          </Box>
          <Divider textAlign="left" sx={{ my: 2 }}>
            README
          </Divider>
          <Box
            component={ReactMarkdown}
            remarkPlugins={[[remarkGfm]]}
            components={components}
            transformImageUri={transformImageUrl}
            sx={{
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
            }}
          >
            {readme}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
