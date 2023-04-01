import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  SxProps,
  Theme,
} from "@mui/material";

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
    title: "まぁじ占いビューア",
    description: "まぁじ占いの結果を一覧で見ることができます。",
    href: "contents/maji-uranai",
    type: "normal",
  },
  {
    title: "kosen-calendar",
    description: "高専ごとのカレンダーをiCalendar形式で公開しています。",
    href: "contents/kosen-calendar",
    type: "normal",
  },
  {
    title: "Domino用 Electone音源定義ファイル",
    description:
      "MIDIエディタ「Domino」でElectoneの資源を最大限活用するための音源定義ファイル",
    href: "/el/domino-define",
    type: "el",
  },
  {
    title: "t7s Electone Project",
    description: "ナナシスの曲をエレクトーンアレンジするプロジェクト",
    href: "/t7s/t7s-electone-project",
    type: "t7s",
  },
  {
    title: "ナナシス履歴書ギャラリー",
    description:
      "ナナシス支配人がTwitterにあげている履歴書を一覧で見ることができます。",
    href: "/t7s/resume",
    type: "t7s",
  },
  {
    title: "t7s 2053 1st Live Startrail カウントダウンイラスト集",
    description:
      "t7s 2053 1st Live Startrailのカウントダウンで公式が投稿したイラストをまとめています。",
    href: "/t7s/illust/2053-1stlive-countdown",
    type: "t7s",
  },
  {
    title: "t7s 2023年エイプリルフール タイトル画面集",
    description:
      "t7s 2023年のエイプリルフールにゲームのタイトル画面で表示されていた画像をまとめています。",
    href: "/t7s/illust/2023-aprilfools_day",
    type: "t7s",
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
    backgroundColor: "#002020",
    color: "#52f9f9",
    border: "1px solid #52f9f9",
  },
};

export default function Page() {
  return (
    <>
      <Title name="Contents" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography variant="title">Contents</Typography>
        <Box
          sx={{
            my: 1,
            width: "90%",
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {contents.map((content) => {
            return (
              <Card key={content.href} sx={sxs[content.type]}>
                <Link
                  href={content.href}
                  underline="none"
                  sx={{ color: "inherit" }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {content.title}
                      </Typography>
                      <Box>{content.description}</Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
