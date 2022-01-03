import Title from "../components/title";
import { Typography, Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <Title name="404 Not Found" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ my: 7 }}>
          よんまるよん
        </Typography>
        <Box sx={{ my: 1 }}>こんなページないよ</Box>
        <Box sx={{ my: 1 }}>404 Not Found</Box>
      </Box>
    </>
  );
}
