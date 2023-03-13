import { NextPage } from "next";
import Image from "next/image";
import { Typography, Box } from "@mui/material";

import Title from "../../../components/title";
import Link from "../../../src/link";

const images = [
  {
    left: 0,
    imgSrc: "https://pbs.twimg.com/media/FqX3fYKaEAAsbJl?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1631982592315781121",
  },
  {
    left: 1,
    imgSrc: "https://pbs.twimg.com/media/FqMawJJaYAEXAnR?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1631308394802868224",
  },
  {
    left: 2,
    imgSrc: "https://pbs.twimg.com/media/FqIhPIWaUAAA1bT?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1630946005427560448",
  },
  {
    left: 3,
    imgSrc: "https://pbs.twimg.com/media/FqC7EzPaMAAW1lF?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1630583608003170304",
  },
  {
    left: 4,
    imgSrc: "https://pbs.twimg.com/media/Fp9Vl_RaYAUK45a?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1630221231663247362",
  },
  {
    left: 5,
    imgSrc: "https://pbs.twimg.com/media/FpkIHLGagAE5XdV?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1629858835199295489",
  },
  {
    left: 6,
    imgSrc: "https://pbs.twimg.com/media/FpkHV0EaEAAp7xn?format=png&name=large",
    tweet: "https://twitter.com/t7s_staff/status/1629496446545190913",
  },
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
      <Title name="t7s 2053 1st Live Startrail カウントダウンイラスト集" />
      <Typography variant="title" align="center">
        <Box sx={{ fontSize: "0.5em" }}>t7s カウントダウンイラスト集</Box>
        <Box>2053 1st Live Startrail </Box>
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            sm: "repeat(5, 1fr)",
            xs: "1fr",
          },
          gridTemplateRows: {
            sm: "repeat(2, 1fr)",
            xs: "repeat(6, 1fr)",
          },
          gridTemplateAreas: {
            sm: '"l0 l0 l1 l2 l3" "l0 l0 l4 l5 l6"',
            xs: '"l0" "l1" "l2" "l3" "l4" "l5" "l6"',
          },
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
                gridArea: `l${image.left}`,
                borderRadius: 1,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1,1.1)",
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
