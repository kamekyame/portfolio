import { Typography, Box } from "@mui/material";

import Title from "../components/title";

export default function Page() {
  return (
    <>
      <Title name="About" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="title">ABOUT</Typography>
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
