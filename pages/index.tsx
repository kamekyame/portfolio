import React, { useEffect, useState, useMemo } from "react";
import type { NextPage } from "next";
import { Typography, Box } from "@mui/material";

import theme from "../src/theme";
import Link from "../src/link";
import Title from "../components/title";

import Logo from "../public/logo.svg";

const pageHeight = `calc(100vh - ${
  (theme.mixins.toolbar["@media (min-width:600px)"] as any).minHeight
}px)`;

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

  return (
    <Box
      sx={{
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
        sx={(theme) => {
          return {
            position: "sticky",
            top: { xs: 56, sm: 64 },
            width: { xs: 1, sm: "30%" },
            p: 1,
            height: { xs: "7em", sm: pageHeight },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.default,
            zIndex: 1,
          };
        }}
      >
        <Box // リンク + バー
          sx={{
            display: "flex",
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
                top: { sm: `${(100 / pages.length) * (nowPageInt || 0)}%` },
                left: { xs: `${(100 / pages.length) * (nowPageInt || 0)}%` },
                transition: "all 0.2s ease",
                width: { xs: `${100 / pages.length}%`, sm: "0.2em" },
                height: { xs: "0.2em", sm: `${100 / pages.length}%` },
                backgroundColor: theme.palette.primary.main,
              })}
            ></Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: { sm: "70%" } }}>
        {/* 右側コンテンツ */}
        {pages.map((page, i) => {
          const Page = page.component;
          return (
            <Box
              key={page.id}
              id={page.id}
              ref={page.ref}
              sx={{
                minHeight: { xs: `calc(${pageHeight} - 7em)`, sm: pageHeight },
                p: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 1.5s ease",
                opacity: nowPageInt === i ? 1 : 0,
              }}
            >
              <Page />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
