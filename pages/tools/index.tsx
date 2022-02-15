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
          <Card>
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
        </Box>
      </Box>
    </>
  );
}
