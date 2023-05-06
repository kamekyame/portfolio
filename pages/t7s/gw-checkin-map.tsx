import { NextPage } from "next";
import Image from "next/image";
import { Typography, Box, FormControlLabel, Checkbox } from "@mui/material";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import Title from "../../components/title";
import Link from "../../src/link";

const Page: NextPage = () => {
  const Map = useMemo(() => {
    return dynamic(() => import("../../components/t7s/map"), { ssr: false });
  }, []);

  const [isShowChara, setIsShowChara] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      <Title name="t7s GWキャンペーン ニッポン全国チェックインイベント マップ" />

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
              src="https://pbs.twimg.com/media/FuOEtVDaUAEce8Q?format=png&name=large"
              fill
              style={{ objectFit: "contain" }}
              alt="GWチェックインイベント ロゴ"
            />
          </Link>
          <Typography variant="h1" align="left" sx={{ m: 0 }}>
            <Box sx={{ fontSize: "0.5em" }}>t7s GWキャンペーン</Box>
            <Box>ニッポン全国チェックインイベント!! マップ</Box>
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mx: 2 }}>
            <FormControlLabel
              onChange={(e, checked) => {
                console.log(e.target, checked);
                setIsShowChara(checked);
              }}
              value={isShowChara}
              control={<Checkbox size="small" />}
              label="GETできるキャラクター名を表示する（ネタばれ注意）"
            />
          </Box>
          <Map showChara={isShowChara} />
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
