import { NextPage } from "next";
import Image from "next/image";
import { Typography, Box, Backdrop } from "@mui/material";

import Title from "../../../components/title";
import { useState } from "react";

const images = [
  "/img/t7s/illust/2024-10th_game_startup-seventh.webp",
  "/img/t7s/illust/2024-10th_game_startup-777sisters.webp",
  "/img/t7s/illust/2024-10th_game_startup-asterline.webp",
];

const Page: NextPage = () => {
  const [fullImage, setFullImage] = useState<string>();

  return (
    <Box sx={{ mb: 3 }}>
      <Title name="t7s 2024年ゲーム10周年記念 タイトル画面集" />
      <Typography variant="h1" align="center">
        <Box sx={{ fontSize: "0.5em" }}>t7s タイトル画面集</Box>
        <Box>2024年 ゲーム10周年記念🎊</Box>
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
