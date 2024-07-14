import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import Title from "../../components/title";
import Link from "../../src/link";

const Page: NextPage = () => {
  const Map = useMemo(() => {
    return dynamic(() => import("../../components/t7s/oshicard-map"), {
      ssr: false,
    });
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <Title name="t7s 全国 推しカードチェックイン!! マップ" />

      <Box
        sx={{
          height: "max(calc(100vh - 64px),500px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            m: 2,
            alignItems: "center",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
          }}
        >
          <Link
            href="https://twitter.com/t7s_staff/status/1649337187303936002"
            target="_blank"
            sx={{
              position: "relative",
              height: { sm: "150px", xs: "100px" },
              aspectRatio: "2/1",
            }}
          >
            <Image
              src="https://pbs.twimg.com/media/GQ6GaiVaQAA9mu5?format=webp&name=large"
              fill
              style={{ objectFit: "contain" }}
              alt="全国 推しカードチェックイン ロゴ"
            />
          </Link>
          <Typography variant="h1" align="left" sx={{ m: 0 }}>
            <Box sx={{ fontSize: "0.5em" }}>t7s</Box>
            <Box>全国 推しカードチェックイン!! マップ</Box>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Map showChara={true} />
        </Box>
      </Box>
      <Box sx={{ m: 1, display: "flex", gap: 1, flexDirection: "column" }}>
        <Box sx={{ fontSize: "1.2em" }}>マップの見方</Box>
        <Box>
          チェックポイントを中心として称号を獲得できる範囲を赤いマルで表示しています。
        </Box>
        <Box sx={{ fontSize: "1.2em" }}>不具合報告</Box>
        <Box>
          すずとものツイッター(
          <Link href="https://twitter.com/SuzuTomo2001" target="_blank">
            @SuzuTomo2001
          </Link>
          )までお願いします。
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
