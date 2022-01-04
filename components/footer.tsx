import { Box, Typography } from "@mui/material";
import Twitter from "@mui/icons-material/Twitter";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";

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
          "& a": { mx: 1.5 },
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
        <Box
          component="a"
          href="https://www.youtube.com/channel/UCP4eqORRoflTk1wyTzvslqA"
          target="_blank"
          color="inherit"
        >
          <YouTube />
        </Box>
      </Box>
      <Box>
        <Typography>@2022 kamekyame</Typography>
      </Box>
    </Box>
  );
}
