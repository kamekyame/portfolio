import { NextPage } from "next";
import Image from "next/image";
import { Typography, Box } from "@mui/material";

import Title from "../../../components/title";
import Link from "../../../src/link";

const images = [
  {
    left: 3,
    imgSrc: "https://pbs.twimg.com/media/FwPhCOpaUAEAozv?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1658487474489024520",
  },
  {
    left: 2,
    imgSrc: "https://pbs.twimg.com/media/FwUbCrhakAELCyg?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1658849866368552961",
  },
  {
    left: 1,
    imgSrc: "https://pbs.twimg.com/media/FwUboR2aMAUb4Bz?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1659212253248487430",
  },
  {
    left: 0,
    imgSrc: "https://pbs.twimg.com/media/FwUcalXaIAQI7JY?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1659574643777507329",
  }
];

const Page: NextPage = () => {
  return (
    <Box
      sx={{
        mb: 3,
        width: "95%",
        mx: "auto",
      }}
    >
      <Title name="t7s Le☆S☆Ca 1st Live カウントダウンイラスト集" />
      <Typography variant="h1" align="center">
        <Box sx={{ fontSize: "0.5em" }}>t7s カウントダウンイラスト集</Box>
        <Box>Le☆S☆Ca 1st Live「グローイング」</Box>
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          mx: "auto",
          // gridTemplateColumns: {
          //   sm: "repeat(5, 1fr)",
          //   xs: "1fr",
          // },
          // gridTemplateRows: {
          //   sm: "repeat(2, 1fr)",
          //   xs: "repeat(6, 1fr)",
          // },
          // gridTemplateAreas: {
          //   sm: '"l0 l0 l1 l2 l3" "l0 l0 l4 l5 l6"',
          //   xs: '"l0" "l1" "l2" "l3" "l4" "l5" "l6"',
          // },
          gap: 2,
        }}
      >
        {images.map((image) => {
          return (
            <Box
              key={image.left}
              sx={{
                position: "relative",
                aspectRatio: "1/1",
                // gridArea: `l${image.left}`,
                borderRadius: 1,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05,1.05)",
                  zIndex: 10,
                },
              }}
            >
              <Link href={image.tweet} target="_blank">
                <Image src={image.imgSrc} alt={`あと${image.left}日`} fill />
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Page;
