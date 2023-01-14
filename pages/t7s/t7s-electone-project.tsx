import { useMemo } from "react";
import { GetStaticProps, NextPage } from "next";
import { Typography, Box, Button, IconButton } from "@mui/material";
import Twitter from "@mui/icons-material/Twitter";
import ChatIcon from "@mui/icons-material/Chat";
import DownloadIcon from "@mui/icons-material/Download";
import { google, youtube_v3 } from "googleapis";
import YouTube from "react-youtube";

import { getDataList } from "../../src/dropbox";
import Link from "../../src/link";
import Title from "../../components/title";

type Props = {
  youtubeData: youtube_v3.Schema$PlaylistItemListResponse;
  dropboxData: ReturnType<typeof getDataList> extends Promise<infer T>
    ? T
    : never;
};

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

const opts = {
  width: "355",
  height: "200",
};

const contributors: Array<{
  name: string;
  twitterId?: string;
}> = [
  {
    name: "すずとも",
    twitterId: "SuzuTomo2001",
  },
  {
    name: "レクト さん",
    twitterId: "rect_1001",
  },
];

export const getStaticProps: GetStaticProps<Props> = async () => {
  const a = await youtube.playlistItems.list({
    playlistId: "PLXkYWIdJaLLrTzQ5d2_Mg5SfLNj71X4iG",
    part: ["id", "snippet"],
    maxResults: 50,
  });
  const dropboxData = await getDataList();
  return {
    props: { youtubeData: a.data, dropboxData },
    revalidate: 60,
  };
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Box
      component="h2"
      sx={{
        fontFamily: "Bank Gothic",
        fontWeight: 300,
        borderBottom: "1px solid #5affff",
        textAlign: "center",
      }}
    >
      {title}
    </Box>
  );
};

const Page: NextPage<Props> = ({ youtubeData, dropboxData }) => {
  const dropboxPdfData = useMemo(() => {
    return dropboxData
      .filter((d) => d.type === "pdf")
      .sort((a, b) => (a > b ? 1 : -1));
  }, [dropboxData]);
  const dropboxZipData = useMemo(() => {
    return dropboxData
      .filter((d) => d.type === "data")
      .sort((a, b) => (a > b ? 1 : -1));
  }, [dropboxData]);

  return (
    <>
      <Title name="t7s Electone Project" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fafafa",
            width: "100%",
            textAlign: "center",
            mb: 5,
            p: 1,
          }}
        >
          <Typography
            variant="title"
            sx={{ fontFamily: "Bank Gothic", fontWeight: 300, color: "black" }}
          >
            t7s Electone Project
          </Typography>
        </Box>
        <Box sx={{ width: "95%" }}>
          <SectionTitle title="Overview" />
          <Box>
            ナナシス（Tokyo 7th
            シスターズ）の曲をエレクトーンでアレンジしよう！と想いで立ち上がったプロジェクト。
            <br />
            更新頻度は低めですが、ナナシス全曲を制覇するのが夢です。
            <br />
            支配人にはエレクトーンでこんなこともできるんだよ！と知ってもらったり、
            エレクトーンプレイヤーにはナナシスっていう素晴らしい曲があるんだよってこと知ってもらったり...
            <br />
            とにかくナナシスもエレクトーンもどちらも布教させるつもりで活動しています！
          </Box>
          <SectionTitle title="YouTube" />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {youtubeData.items?.map((item) => {
              const title = item.snippet?.title;
              const videoId = item.snippet?.resourceId?.videoId || undefined;
              return (
                <Box key={item.id}>
                  <YouTube videoId={videoId} opts={opts} />
                </Box>
              );
            })}
          </Box>
          <SectionTitle title="Download" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Box
                sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}
              >
                楽譜
              </Box>
              {dropboxPdfData.map((item) => {
                return (
                  <Link
                    key={item.downloadUrl}
                    href={item.downloadUrl}
                    underline="none"
                    color="inherit"
                    sx={{
                      display: "grid",
                      gap: 2,
                      my: 1,
                      gridTemplateColumns: "1fr max-content",
                    }}
                  >
                    <span>{item.fileName}</span>
                    <DownloadIcon />
                  </Link>
                );
              })}
            </Box>
            <Box>
              <Box
                sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}
              >
                データ
              </Box>
              {dropboxZipData.map((item) => {
                return (
                  <Link
                    key={item.downloadUrl}
                    href={item.downloadUrl}
                    underline="none"
                    color="inherit"
                    sx={{
                      display: "grid",
                      gap: 2,
                      my: 1,
                      gridTemplateColumns: "1fr max-content",
                    }}
                  >
                    <span>{item.fileName}</span>
                    <DownloadIcon />
                  </Link>
                );
              })}
            </Box>
          </Box>
          <SectionTitle title="Contributor" />
          <Box
            component="ul"
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "space-evenly",
              p: 0,
              "& > li": {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            {contributors.map((contributor) => {
              return (
                <li key={contributor.name}>
                  {contributor.name}
                  {contributor.twitterId && (
                    <IconButton
                      size="small"
                      href={"https://twitter.com/" + contributor.twitterId}
                      target="_blank"
                    >
                      <Twitter fontSize="inherit" />
                    </IconButton>
                  )}
                </li>
              );
            })}
          </Box>
          <SectionTitle title="Join" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            プロジェクト参加者募集中です！エレクトーン未経験でもOK！
            <ul>
              <li>ナナシス楽曲の耳コピ</li>
              <li>エレクトーン用アレンジ譜面の作成</li>
              <li>エレクトーン用音色の作成</li>
              <li>完成した譜面の試弾</li>
              <li>YouTube投稿動画・サムネの作成</li>
              <li>プロジェクト布教 etc.</li>
            </ul>
            とにかく興味のある人は気軽にDiscordに参加してください！
            <br />
            <Button
              href="https://discord.gg/7MfGf2M"
              sx={{
                backgroundColor: "#5865F2",
                color: "white",
                m: 1,
                px: 2,
              }}
              startIcon={<ChatIcon />}
            >
              t7s Electone Project Discordサーバ
            </Button>
          </Box>
          <SectionTitle title="Request" />
          <Box sx={{ textAlign: "center" }}>
            リクエストは以下のリンクからお願いします！
            <br />
            <Button
              href="https://forms.gle/k7YYdWhPUYpNJrSBA"
              sx={{
                px: 2,
                backgroundColor: "#eff258",
                color: "black",
                m: 1,
              }}
              startIcon={<ChatIcon />}
            >
              リクエスト用Google Forms
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Page;
