import { Typography, Box, SxProps, Theme } from "@mui/material";

import Link from "../../src/link";
import Title from "../../components/title";

const contents: Array<{
  title: string;
  description: string;
  href: string;
  type: "normal" | "el" | "t7s";
  bgImage?: string;
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
    title: "t7s チェックインスポット マップ",
    description:
      "t7s GWキャンペーン ニッポン全国チェックインイベント!!のチェックポイントをマップ上にプロットしてみました。",
    href: "/t7s/gw-checkin-map",
    type: "t7s",
    bgImage:
      "https://pbs.twimg.com/media/FuOEtVDaUAEce8Q?format=png&name=large",
  },
  {
    title: "kosen-calendar",
    description: "高専ごとのカレンダーをiCalendar形式で公開しています。",
    href: "contents/kosen-calendar",
    type: "normal",
  },
  {
    title: "2024年エイプリルフール\nタイトル画面集",
    description:
      "t7s 2024年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2024-aprilfools_day",
    bgImage: "/img/t7s/illust/2024-april_fool-nanasisu_dot.webp",
    type: "t7s",
  },
  {
    title: "2024年ゲーム10周年記念\nタイトル画面集",
    description:
      "t7s 2024年2月19日のゲーム10周年に合わせてゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2024-10th_game_startup",
    type: "t7s",
    bgImage: "https://t7s.jp/10th_anniversary/assets/images/kv/kv_pc_04.png",
  },
  {
    title: "Le☆S☆Ca 1st Live\nカウントダウンイラスト集",
    description:
      "t7s Le☆S☆Ca 1st Liveのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/lesca-1stlive-countdown",
    type: "t7s",
    bgImage: "https://t7s.jp/live/lesca1stlive/top/img/main.png",
  },
  {
    title: "2053 1st Live Startrail\nカウントダウンイラスト集",
    description:
      "t7s 2053 1st Live Startrailのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/2053-1stlive-countdown",
    type: "t7s",
    bgImage: "https://t7s.jp/live/startrail/top/img/main.png",
  },
  {
    title: "2023年エイプリルフール\nタイトル画面集",
    description:
      "t7s 2023年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2023-aprilfools_day",
    type: "t7s",
    bgImage: "/img/t7s/illust/2023-april_fool-nanasisu_walk.webp",
  },
  {
    title: "ナナシス履歴書ギャラリー",
    description:
      "ナナシス支配人がTwitterにあげている履歴書を一覧で見ることができます。",
    href: "/t7s/resume",
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
                  backgroundColor: "black",
                },

                display: "grid",
                gridTemplateRows: "1.5em 4fr 6fr",

                "&::before": {
                  content: `""`,
                  position: "absolute",
                  backgroundImage: `url(${content.bgImage})`,
                  inset: "-5px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  filter: "blur(5px)",
                },
              }}
            >
              <Box
                className="backdrop"
                sx={{
                  position: "absolute",
                  inset: "0",
                  backgroundColor: "white",
                  opacity: 0.5,
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
