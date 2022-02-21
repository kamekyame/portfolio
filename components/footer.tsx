import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Twitter from "@mui/icons-material/Twitter";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";

export default function App() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "2px solid #AAA",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        p: 2,
        pt: 7,
        pb: 10,
        mt: 3,
        gap: 2,
      }}
    >
      <Box>
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
        <Box sx={{ textAlign: "center" }}>
          <Typography>©2022 kamekyame</Typography>
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
          Contents
        </Typography>
        <Link href="/">Top</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/sztm-bot">Sztm-bot</Link>
      </Box>
    </Box>
  );
}
