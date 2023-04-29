import { Typography, Box, SxProps, Theme } from "@mui/material";

import Link from "../../src/link";
import Title from "../../components/title";

const contents: Array<{
  title: string;
  description: string;
  href: string;
  type: "normal" | "el" | "t7s";
}> = [
  {
    title: "EL-Explorer",
    description: "エレクトーン用のエクスプローラです。",
    href: "/el/explorer",
    type: "el",
  },
  {
    title: "t7s Electone Project",
    description: "ナナシスの曲をエレクトーンアレンジするプロジェクト",
    href: "/t7s/t7s-electone-project",
    type: "t7s",
  },
  {
    title: "t7s DataBase",
    description:
      "ナナシスのキャラ・ユニット・ゲーム内楽曲・CD等のデータが閲覧できるサイト",
    href: "/t7s/db",
    type: "t7s",
  },
  {
    title: "Domino用\nElectone音源定義ファイル",
    description:
      "MIDIエディタ「Domino」でElectoneの資源を最大限活用するための音源定義ファイル",
    href: "/el/domino-define",
    type: "el",
  },
  {
    title: "kosen-calendar",
    description: "高専ごとのカレンダーをiCalendar形式で公開しています。",
    href: "contents/kosen-calendar",
    type: "normal",
  },

  {
    title: "ナナシス履歴書ギャラリー",
    description:
      "ナナシス支配人がTwitterにあげている履歴書を一覧で見ることができます。",
    href: "/t7s/resume",
    type: "t7s",
  },
  {
    title: "t7s 2053 1st Live Startrail\nカウントダウンイラスト集",
    description:
      "t7s 2053 1st Live Startrailのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/2053-1stlive-countdown",
    type: "t7s",
  },
  {
    title: "t7s 2023年エイプリルフール\nタイトル画面集",
    description:
      "t7s 2023年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2023-aprilfools_day",
    type: "t7s",
  },
  {
    title: "まぁじ占いビューア",
    description: "まぁじ占いの結果を一覧で見ることができます。",
    href: "contents/maji-uranai",
    type: "normal",
  },

  {
    title: "My-Electone",
    description:
      "すずともが過去に弾いてきた曲たちを忘備録としてまとめています。",
    href: "/contents/my-electone",
    type: "normal",
  },
];

const sxs: { [key: string]: SxProps<Theme> } = {
  normal: {
    backgroundColor: (t) => t.palette.primary.main,
    color: (t) => t.palette.primary.contrastText,
  },
  el: {
    backgroundColor: (t) => t.palette.secondary.main,
    color: (t) => t.palette.secondary.contrastText,
  },
  t7s: {
    backgroundColor: "#52f9f9",
    color: "black",
  },
};

export default function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 5,
      }}
    >
      <Title name="Contents" />
      <Typography variant="h1">Contents</Typography>
      <Box
        sx={{
          width: "90%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px, 1fr))",
          gap: 1,
        }}
      >
        {contents.map((content) => {
          return (
            <Link
              href={content.href}
              key={content.href}
              underline="none"
              color="inherit"
              sx={{
                position: "relative",
                p: 2,
                borderRadius: 1.5,
                backgroundColor: "#efefef",
                aspectRatio: "16/9",
                transition: "all 0.2s",
                color: "black",
                overflow: "hidden",
                "&:hover": {
                  color: "#fff",
                },
                "&:hover .backdrop": {
                  opacity: 0.5,
                },

                display: "grid",
                gridTemplateRows: "1.5em 4fr 6fr",
              }}
            >
              <Box
                className="backdrop"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "black",
                  opacity: 0,
                  height: "100%",
                  width: "100%",
                  zIndex: 1,
                  transition: "all 0.2s",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "2px",
                  width: "fit-content",
                  height: "1.5em",
                  px: "0.7em",
                  pt: "0.33em",
                  pb: "0.17em",
                  fontSize: "0.8em",
                  lineHeight: 1,
                  zIndex: 2,
                  fontWeight: "bold",
                  ...sxs[content.type],
                }}
              >
                {content.type}
              </Box>
              <Box
                sx={{
                  mt: "auto",
                  pb: 0.3,
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  zIndex: 2,
                }}
              >
                {content.title.split(/(\n)/).map((i) => {
                  if (i === "\n") return <br />;
                  return <>{i}</>;
                })}
              </Box>
              <Box
                sx={{
                  fontSize: "0.8em",
                  lineHeight: 1.4,
                  zIndex: 2,
                }}
              >
                {content.description}
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
