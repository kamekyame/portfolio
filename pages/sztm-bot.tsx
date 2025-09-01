import { NextPage, GetStaticProps } from "next";
import Script from "next/script";
import { Typography, Box } from "@mui/material";

import Link from "../src/link";
import Title from "../components/title";

type Props = { botWorking: boolean };

const Page: NextPage<Props> = ({ botWorking }) => {
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
        <Typography variant="h1">SZTM-BOT</Typography>
        <Box sx={{ my: 1 }}>{botWorking ? `Bot稼働中` : "Bot停止中"}</Box>
        <Box sx={{ my: 1, textAlign: "center", width: "90%" }}>
          すずともが制作しているBot達です。可愛がってあげてください。
          <br />X API の一部有料化に伴い終了したBotもあります。ご了承ください。
        </Box>
        <Box sx={{ width: "90%" }}>
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
              <blockquote className="twitter-tweet" data-lang="ja">
                <p lang="ja" dir="ltr">
                  ロボコン2025「Great High Gate」
                  <br />
                  <br />
                  北海道まで　　 27日
                  <br />
                  東北まで　　　 41日
                  <br />
                  近畿まで　　　 20日
                  <br />
                  東海北陸まで　 34日
                  <br />
                  九州沖縄まで　 27日
                  <br />
                  関東甲信越まで 41日
                  <br />
                  中国まで　　　 34日
                  <br />
                  四国まで　　　 48日
                  <br />
                  <br />
                  🎖全国まで　 76日
                  <a href="https://twitter.com/hashtag/%E3%83%AD%E3%83%9C%E3%82%B3%E3%83%B3?src=hash&amp;ref_src=twsrc%5Etfw">
                    #ロボコン
                  </a>
                </p>
                &mdash; すずとものついったー (@SuzuTomo2001){" "}
                <a href="https://twitter.com/SuzuTomo2001/status/1962274214930477374?ref_src=twsrc%5Etfw">
                  2025年8月31日
                </a>
              </blockquote>
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
              <blockquote className="twitter-tweet" data-lang="ja">
                <p lang="qme" dir="ltr">
                  <a href="https://twitter.com/hashtag/%E3%83%8A%E3%83%8A%E3%82%B7%E3%82%B9?src=hash&amp;ref_src=twsrc%5Etfw">
                    #ナナシス
                  </a>
                  <a href="https://twitter.com/hashtag/t7s?src=hash&amp;ref_src=twsrc%5Etfw">
                    #t7s
                  </a>
                  <a href="https://t.co/JRxK29hrB4">
                    pic.twitter.com/JRxK29hrB4
                  </a>
                </p>
                &mdash; すずとものついったー (@SuzuTomo2001)
                <a href="https://twitter.com/SuzuTomo2001/status/1962281786848743759?ref_src=twsrc%5Etfw">
                  2025年8月31日
                </a>
              </blockquote>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              じゃんけんBOT（終了）
            </Typography>
            <Box>
              Twitterで すずとも とじゃんけんができるBOTです。
              <br />X API 有料化に伴い終了しました。
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              まぁじ占いアンラッキーBOT（終了）
            </Typography>
            <Box>
              まぁじ
              っていう人が毎朝やってる「まぁじ占い」。まぁじ占いはラッキー星座・色しか占わないので、すずともがアンラッキー星座・色を占ってあげています。
              <br />
              (ついでに占い情報も収集しています。)
              <br />X API 有料化に伴い終了しました。
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ my: 2 }}>
              (くそ)占いBOT（終了）
            </Typography>
            <Box>
              Twitterで 占い と送ると運勢とラッキーアイテムが返ってくるBOTです。
              <br />
              @SuzuTomo2001宛に「占い」という文字列を含んだツイートを送信してください。
              <br />X API 有料化に伴い終了しました。
            </Box>
          </Box>
        </Box>
      </Box>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("https://api.kamekyame.com/version");
  const botWorking = res.ok;
  return { props: { botWorking } };
};

export default Page;
