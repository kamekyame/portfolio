import React, { useEffect, useState, useMemo, useRef } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { Typography, Box, useMediaQuery } from "@mui/material";

import theme from "../src/theme";
import Link from "../src/link";
import Title from "../components/title";

import Logo from "../public/logo.svg";
import GitHub from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import QiitaIcon from "../public/qiita.png";

const pageHeight = (media: "xs" | "sm") =>
  `calc(100vh - ${media === "sm" ? 64 : 56}px)`;

const Welcome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 3,
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "20%" }} component={Logo}></Box>
      <Typography variant="h6">{"Welcome to sztm's portfolio"}</Typography>
    </Box>
  );
};

const Profile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ my: 1 }}>
        プログラミングとか音楽とかゲームとかいろいろ浅くやってます。
      </Box>
      <Box sx={{ my: 2 }}>
        <Box
          component="table"
          sx={(theme) => ({
            borderCollapse: "collapse",
            "& tr": {},
            "& th,& td": {
              py: 0.5,
              px: 2,
              width: "50%",
              borderBottom: `1px solid ${theme.palette.primary.dark}`,
            },
            "& th": {
              textAlign: "right",
            },
          })}
        >
          <tbody>
            <Box component="tr">
              <Box component="th">Name</Box>
              <Box component="td">すずとも</Box>
            </Box>
            <Box component="tr">
              <Box component="th">Sub Name</Box>
              <Box component="td">kamekyame</Box>
            </Box>

            <Box component="tr">
              <Box component="th">From</Box>
              <Box component="td">福井</Box>
            </Box>

            <Box component="tr">
              <Box component="th">Birth</Box>
              <Box component="td">11/6</Box>
            </Box>

            <Box component="tr">
              <Box component="th">Programming Skil</Box>
              <Box component="td">
                JS, TS, C++, C#
                <br />
                Deno, React, Unity, Arduino, Mbed
              </Box>
            </Box>

            <Box component="tr">
              <Box component="th">Hobby</Box>
              <Box component="td">エレクトーン</Box>
            </Box>

            <Box component="tr">
              <Box component="th">Experience</Box>
              <Box component="td">
                エレクトーンコンクール(ソロ・アンサンブル)
                <br />
                高専ロボコン
                <br />
                回路設計・作成
                <br />
                Twitter Bot 作成
                <br />
                自サイト開発・運用
              </Box>
            </Box>
          </tbody>
        </Box>
      </Box>
    </Box>
  );
};

const Projects = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        これまでに作成したツールや参加しているプロジェクト等の一覧です。
      </Box>
      <Box
        component="ul"
        sx={(theme) => ({
          listStyle: "none",
          p: 0,
          m: 0,
          "& li": {
            p: 1,
            borderBottom: `1px solid ${theme.palette.primary.dark}`,
          },
        })}
      >
        <Box
          component="li"
          sx={{
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gridTemplateRows: "min-content 1fr",
            gap: 1,
          }}
        >
          <Box sx={{ gridRow: "1/-1" }}>
            <Image
              src="https://kakomimasu.com/img/kakomimasu-icon.png"
              alt="囲みマスアイコン"
              width="30"
              height="30"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Link href="https://kakomimasu.com" color="inherit">
              囲みマス
            </Link>
            <Link href="https://github.com/kakomimasu" color="inherit">
              <GitHub />
            </Link>
          </Box>
          <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
            コロナによって中止になった高専プロコン2020
            競技部門をオンライン上でプレイ可能にするプロジェクト
            <br />
            サーバ(server)・フロント(viewer)の開発を主に担当。
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gridTemplateRows: "min-content 1fr",
            gap: 1,
          }}
        >
          <Box
            sx={{
              gridColumn: "2 / -1",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/contents/kosen-calendar" color="inherit">
              高専カレンダー
            </Link>
            <Link
              href="https://github.com/kamekyame/kosen-calendar"
              color="inherit"
            >
              <GitHub />
            </Link>
          </Box>
          <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
            各高専の行事予定をical形式で提供するプロジェクト。
            <br />
            対応高専は限られているが、スクレイピングスクリプトとGithub
            Actionsの活用により予定変更時にも対応
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gridTemplateRows: "min-content 1fr",
            gap: 1,
          }}
        >
          <Box
            sx={{
              gridColumn: "2 / -1",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/sztm-bot" color="inherit">
              Twitter Bot
            </Link>
          </Box>
          <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
            Twitterのリプライに応答したり、特定のツイートを収集したりしている。
            <br />
            活用例→<Link href="contents/maji-uranai">まぁじ占いビューア</Link>、
            <Link href="/t7s/resume">ナナシス履歴書ギャラリー</Link>
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gridTemplateRows: "min-content 1fr",
            gap: 1,
          }}
        >
          <Box
            sx={{
              gridColumn: "2 / -1",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/t7s/t7s-electone-project" color="inherit">
              t7s Electone Project
            </Link>
          </Box>
          <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
            スマホリズムゲーム
            <Link href="https://t7s.jp">
              「Tokyo 7thシスターズ」（通称、t7s）
            </Link>
            で制作されている楽曲をエレクトーンでアレンジするプロジェクト
            <br />
            参加者募集中です！笑
          </Box>
        </Box>
        <Box
          component="li"
          sx={{
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gridTemplateRows: "min-content 1fr",
            gap: 1,
          }}
        >
          <Box
            sx={{
              gridColumn: "2 / -1",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/el/domino-define" color="inherit">
              Domino用エレクトーン音源定義ファイル
            </Link>
          </Box>
          <Box sx={{ gridColumn: "2 / -1", fontSize: "0.8em" }}>
            MIDI編集ソフト
            <Link href="https://takabosoft.com/domino">「Domino」</Link>
            でエレクトーン音源を扱いやすくする音源定義ファイルを作成。
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Links = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>各種リンク集です。</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          "& .link-icon": {
            minWidth: "30px",
            minHeight: "30px",
            width: "10vw",
            height: "10vw",
            maxWidth: "70px",
            maxHeight: "70px",
            position: "relative",
          },
        }}
      >
        <Box>
          <Link href="https://qiita.com/SuzuTomo2001">
            <Box className="link-icon">
              <Image src={QiitaIcon} alt="Qiita Icon" fill />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link href="https://github.com/kamekyame" color="inherit">
            <GitHub className="link-icon" />
          </Link>
        </Box>
        <Box>
          <Link href="https://twitter.com/SuzuTomo2001" color="inherit">
            <TwitterIcon className="link-icon" sx={{ color: "#1DA1F2" }} />
          </Link>
        </Box>
        <Box>
          <Link
            href="https://www.youtube.com/channel/UCP4eqORRoflTk1wyTzvslqA"
            color="inherit"
          >
            <YouTubeIcon
              className="link-icon"
              sx={{
                color: "#FF0000",
                backgroundColor: "#FFFFFF",
                borderRadius: "20%",
              }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const pages: {
  id: string;
  title: string;
  component: React.FC;
  ref: React.RefObject<HTMLDivElement>;
}[] = [
  {
    id: "welcome",
    title: "Welcome",
    component: Welcome,
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    id: "profile",
    title: "Profile",
    component: Profile,
    ref: React.createRef<HTMLDivElement>(),
  },

  {
    id: "projects",
    title: "Projects",
    component: Projects,
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    id: "links",
    title: "Links",
    component: Links,
    ref: React.createRef<HTMLDivElement>(),
  },
];

const Home: NextPage = () => {
  const [nowPageDouble, setNowPageDouble] = useState<number>();
  const nowPageInt = useMemo(() => {
    if (nowPageDouble === undefined) return undefined;
    let nowInt = Math.round(nowPageDouble);
    if (nowInt === pages.length) nowInt--;
    return nowInt;
  }, [nowPageDouble]);

  useEffect(() => {
    const onScroll = () => {
      const offset = window.pageYOffset;
      const heights: number[] = [];
      pages.forEach((page) => {
        const height = page.ref.current?.clientHeight || 0;
        const beforeHeight = heights[heights.length - 1] || 0;
        heights.push(beforeHeight + height);
      });
      let page = 0;
      heights.forEach((height, i) => {
        const beforeHeight = heights[i - 1] || 0;
        if (offset >= beforeHeight && offset < height) {
          page = (offset - beforeHeight) / (height - beforeHeight) + i;
        }
      });
      setNowPageDouble(page);
    };
    onScroll();
    addEventListener("scroll", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
    };
  }, []);

  const sideBarRef = useRef<HTMLDivElement>();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    const element = sideBarRef.current;
    if (element === undefined) return;
    if (isSm) {
      const top =
        ((element.scrollHeight - element.offsetHeight) * (nowPageInt || 0)) /
        (pages.length - 1);
      element.scrollTo({ top });
    } else {
      const left =
        ((element.scrollWidth - element.offsetWidth) * (nowPageInt || 0)) /
        (pages.length - 1);
      element.scrollTo({ left });
    }
  }, [nowPageInt, isSm]);

  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "black",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        width: "100%",
      }}
    >
      <Title name="Top" />
      <Box // 左サイドバー(モバイルの場合はトップに表示)
        sx={{
          position: "sticky",
          top: { xs: 56, sm: 64 },
          width: { xs: 1, sm: "25%" },
          p: 1,
          height: { xs: "6em", sm: pageHeight("sm") },
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "end", xs: "center" },
          zIndex: 1,
          backgroundColor: "black",
        }}
        ref={sideBarRef}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: undefined },
            maxHeight: { xs: undefined, sm: "100%" },
            overflow: "auto",
          }}
          ref={sideBarRef}
        >
          <Box // リンク + バー
            sx={{
              display: "flex",
              width: "fit-content",
              maxWidth: { sm: "100%", xs: undefined },
              flexDirection: { xs: "column", sm: "row" },
              p: { xs: 1, sm: 4 },
              borderRight: { xs: "0px", sm: "1px solid" },
              borderBottom: { xs: "1px solid", sm: "0px" },
            }}
          >
            <Box // リンク
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                textAlign: { xs: "center", sm: "right" },
                fontSize: "1.2em",
              }}
            >
              {pages.map((page, i) => {
                const isActive = nowPageInt === i;
                return (
                  <Link
                    key={page.id}
                    href={`#${page.id}`}
                    replace
                    underline="none"
                    color="inherit"
                  >
                    <Box
                      sx={{
                        my: { xs: 0, sm: 2 },
                        mx: { xs: 2, sm: 0 },
                        transition: "all 0.2s ease-in-out",
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive ? "inherit" : "#AAA",
                        cursor: "pointer",
                        width: "4.5em",
                      }}
                    >
                      {page.title}
                    </Box>
                  </Link>
                );
              })}
            </Box>
            <Box sx={{ mx: { xs: 0, sm: 2 }, my: { xs: 2, sm: 0 } }}>
              <Box // バー
                sx={(theme) => ({
                  position: "relative",
                  top: {
                    sm: `${(100 / pages.length) * (nowPageInt || 0)}%`,
                    xs: "0%",
                  },
                  left: {
                    xs: `${(100 / pages.length) * (nowPageInt || 0)}%`,
                    sm: "0%",
                  },
                  transition: "all 0.2s ease",
                  width: { xs: `${100 / pages.length}%`, sm: "0.2em" },
                  height: { xs: "0.2em", sm: `${100 / pages.length}%` },
                  backgroundColor: theme.palette.primary.main,
                })}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: { sm: "75%" } }}>
        {/* 右側コンテンツ */}
        {pages.map((page, i) => {
          const Page = page.component;
          return (
            <Box
              key={page.id}
              ref={page.ref}
              sx={{
                minHeight: {
                  xs: `calc(${pageHeight("xs")} - 7em)`,
                  sm: pageHeight("sm"),
                },
                px: 3,
                py: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity .5s ease",
                opacity: { xs: 1, sm: nowPageInt === i ? 1 : 0 }, // スマホはアニメーションすると見にくいので無効に
                position: "relative",
              }}
            >
              <Box // スマホ向けレイアウト時のページ内遷移用にmarginとして配置
                id={page.id}
                sx={{
                  position: "absolute",
                  top: { xs: "-7em", sm: 0 },
                  height: "7em",
                  width: "100%",
                }}
              />
              <Page />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
