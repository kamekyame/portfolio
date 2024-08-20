import { Box, Typography } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";

import Link from "../src/link";

export default function App() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        borderTop: "2px solid #fafafa",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        p: 2,
        pt: 7,
        pb: 10,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            "& a": {
              display: "flex",
              width: "24px",
              height: "24px",
              alignItems: "center",
              justifyContent: "center",
            },
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
            href="https://x.com/SuzuTomo2001"
            target="_blank"
            color="inherit"
          >
            <XIcon />
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
        <Box sx={{ textAlign: "center" }}>
          <Typography>©2024 kamekyame</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 2,
          "& a": {
            color: "white",
            textDecoration: "none",
          },
          "& a:link, & a:visited, & a:hover, & a:active": {
            color: "white",
          },
        }}
      >
        <Typography variant="h6" sx={{ my: 1 }}>
          kamekyame.com
        </Typography>
        <Link href="/">Top</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contents">Contents</Link>
        <Link href="/sztm-bot">Sztm-bot</Link>
      </Box>
    </Box>
  );
}
