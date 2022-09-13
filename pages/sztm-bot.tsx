import { NextPage } from "next";
import { Typography, Box } from "@mui/material";
import { Mention, Tweet } from "react-twitter-widgets";

import Link from "../src/link";
import Title from "../components/title";

const Page: NextPage<{ botVersion: string }> = ({ botVersion }) => {
  return (
    <>
      <Title name="sztm-bot" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="title">SZTM-BOT</Typography>
        <Box sx={{ my: 1 }}>
          {botVersion ? `Bot ver.${botVersion}` : "Botは稼働していません"}
        </Box>
        <Box sx={{ my: 1, textAlign: "center", width: "90%" }}>
          すずともが制作しているBot達です。可愛がってあげてください。
          <br />
          以前のサーバでいろいろ動かしていましたが、サーバPCが壊れてしまったので再構築していますので、まだ未整備のBOTはしばしお待ちを
        </Box>
        <Box sx={{ width: "90%" }}>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              じゃんけんBOT
            </Typography>
            <Box>
              Twitterで すずとも とじゃんけんができるBOTです。
              <br />
              現在整備中ですので、お待ちください。
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              まぁじ占いアンラッキーBOT
            </Typography>
            <Box>
              まぁじ
              っていう人が毎朝やってる「まぁじ占い」。まぁじ占いはラッキー星座・色しか占わないので、すずともがアンラッキー星座・色を占ってあげています。
              <br />
              (ついでに占い情報も収集しています。)
              <br />
              現在整備中ですので、お待ちください。
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              高専ロボコンInfo-BOT
            </Typography>
            <Box>
              高専ロボコンの各大会までの日数を毎朝ツイートするBOTです。
              <br />
              高専ロボコンが気になった方は
              <Link href="https://official-robocon.com/kosen/">ロボコンHP</Link>
              まで！
              <Tweet tweetId="1478124008881242113" options={{ lang: "ja" }} />
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              ナナシスInfo-BOT
            </Typography>
            <Box>
              ゲームアプリ「Tokyo 7th
              シスターズ」の周年までの日数を毎朝ツイートするBOTです。
              <br />
              ナナシスが気になった方は
              <Link href="http://t7s.jp/">Tokyo 7th Sisters 公式HP</Link>
              まで！
              <Tweet tweetId="1478131558687068160" options={{ lang: "ja" }} />
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              (くそ)占いBOT
            </Typography>
            <Box>
              Twitterで 占い と送ると運勢とラッキーアイテムが返ってくるBOTです。
              <br />
              @SuzuTomo2001宛に「占い」という文字列を含んだツイートを送信してください。
              <br />
              <Mention
                username="SuzuTomo2001"
                options={{ text: "占い", size: "large" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

Page.getInitialProps = async () => {
  const res = await fetch("https://api.kamekyame.com/version");
  const botVersion = res.ok ? await res.text() : "";
  return { botVersion };
};

export default Page;
