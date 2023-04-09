import { NextPage } from "next";
import Image from "next/image";
import { Typography, Box, Backdrop } from "@mui/material";

import Title from "../../../components/title";
import { useState } from "react";

const images = [
  "/img/t7s/illust/2023-april_fool-ichinose_mai.webp",
  "/img/t7s/illust/2023-april_fool-namerikawa_noriyuki.webp",
  "/img/t7s/illust/2023-april_fool-nanasisu_walk.webp",
  "/img/t7s/illust/2023-april_fool-nanasuta_w-penguin.webp",
  "/img/t7s/illust/2023-april_fool-otogeno_hukkatu.webp",
];

const Page: NextPage = () => {
  const [fullImage, setFullImage] = useState<string>();

  return (
    <Box sx={{ mb: 3 }}>
      <Title name="t7s 2023年エイプリルフール タイトル画面集" />
      <Typography variant="h1" align="center">
        <Box sx={{ fontSize: "0.5em" }}>t7s タイトル画面集</Box>
        <Box>2023年 エイプリルフール</Box>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {images.map((image) => {
          return (
            <Box
              key={image}
              sx={{
                position: "relative",
                width: "30%",
                minWidth: "300px",
                aspectRatio: "16/9",
                borderRadius: 1,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05,1.05)",
                  zIndex: 10,
                },
              }}
              onClick={() => setFullImage(image)}
            >
              <Image src={image} alt={image} fill priority />
            </Box>
          );
        })}
      </Box>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!fullImage}
        onClick={() => setFullImage(undefined)}
      >
        <Box
          sx={{
            position: "relative",
            width: "90vw",
            height: "90vh",
          }}
        >
          {fullImage && (
            <Image
              src={fullImage}
              alt={fullImage}
              fill
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>
      </Backdrop>
    </Box>
  );
};

export default Page;
