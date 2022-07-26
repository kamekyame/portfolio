import Link from "next/link";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

import Title from "../../components/title";

export default function Page() {
  return (
    <>
      <Title name="Tools" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography variant="title">TOOLS</Typography>
        <Box
          sx={{
            my: 1,
            width: "90%",
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              backgroundColor: (t) => t.palette.primary.main,
              color: (t) => t.palette.primary.contrastText,
            }}
          >
            <Link href="tools/maji-uranai" passHref>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    まぁじ占いビューア
                  </Typography>
                  <Box>まぁじ占いの結果を一覧で見ることができます。</Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
          <Card
            sx={{
              backgroundColor: (t) => t.palette.secondary.main,
              color: (t) => t.palette.secondary.contrastText,
            }}
          >
            <Link href="/el/domino-define" passHref>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Domino用 Electone音源定義ファイル
                  </Typography>
                  <Box>
                    MIDIエディタ「Domino」でElectoneの資源を最大限活用するための音源定義ファイル
                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Box>
      </Box>
    </>
  );
}
