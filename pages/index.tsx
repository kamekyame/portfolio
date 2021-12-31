import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Head>
        <title>welcome - sztm</title>
      </Head>

      <h1>すずとものブログ</h1>
      <p>
        自宅で運用していたサーバ用PCが逝ってしまったのでこれを気にWordpressから自作ページに移行してます。
      </p>
      <p>いっしょうけんめいがんばってるので整備されるまでしばしばお待ちを😎</p>

      <p>
        ゆる募(僕がしたいことも含めて)
        <ul>
          <li>
            サイトのタイトル（いまは仮にすずとものブログってしてるけど、ブログコンテンツだけではないので...）
          </li>
          <li>ろご作成(サブネームがkamekyameなので亀っぽいなにかいい感じの)</li>
          <li>もろもろのデザイン</li>
        </ul>
      </p>
    </div>
  );
};

export default Home;
