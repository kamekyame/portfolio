import { Box, Typography } from "@mui/material";
import { Twitter, GitHub } from "@mui/icons-material";

export default function App() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
      })}
    >
      <Box
        sx={{
          m: 1,
          "& a": { mx: 2 },
        }}
      >
        <Box
          component="a"
          href="https://github.com/kamekyame"
          target="_blank"
          color="inherit"
        >
          <GitHub />
        </Box>
        <Box
          component="a"
          href="https://twitter.com/SuzuTomo2001"
          target="_blank"
          color="inherit"
        >
          <Twitter />
        </Box>
      </Box>
      <Box>
        <Typography>@2022 kamekyame</Typography>
      </Box>
    </Box>
  );
}
