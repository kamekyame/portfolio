import React, { useMemo } from "react";
import type { GetStaticProps, NextPage } from "next";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import Title from "../../components/title";

function createData(title: string, note: string = "") {
  return { title, note };
}

const musics = [
  createData("彼方の光"),
  createData("旅立ちの日に"),
  createData("坂井市立雄島小学校 校歌", "ピアノ"),
  createData("旅立ちの日に", "ピアノ"),
  createData("TRUTH"),
  createData("今、咲き誇る花たちよ"),
  createData("雨のち晴レルヤ"),
  createData("Departure"),
  createData("Smile", "JEF2011 中部地区大会出場曲"),
  createData("宝島"),
  createData("レット・イット・ゴー ～ありのままで～"),
  createData("unlimited", "ピアノ、中1合唱コンクール伴奏曲"),
  createData("Spin Kick"),
  createData("宝島", "自編曲"),
  createData("キセキ"),
  createData("Forever"),
  createData("FLY HIGH(Symphonic ver.)"),
  createData("YES!!"),
  createData("君の瞳に恋してる"),
  createData("時の旅人", "ピアノ、中2合唱コンクール伴奏曲"),
  createData("坂井市立三国中学校 校歌", "ピアノ"),
  createData("故郷 Homeland", "ピアノ"),
  createData("希空 ～まれぞら～"),
  createData("上を向いて歩こう", "ピアノ"),
  createData("エトピリカ"),
  createData("真赤な太陽"),
  createData("勝手にしやがれ"),
  createData("きよしこの夜"),
  createData("風のゆくえ"),
  createData("東京ブギウギ"),
  createData("恋のバカンス"),
  createData("365日の紙飛行機"),
  createData("ふるさと"),
  createData("群青", "ピアノ"),
  createData("「スター・ウォーズ」メインタイトル"),
  createData("サンダーバードのテーマ"),
  createData("「スター・ウォーズ」メドレー"),
  createData("プレゼント", "ピアノ、中3合唱コンクール伴奏曲"),
  createData("海の声"),
  createData("I Wish For You"),
  createData("川の流れのように"),
  createData("ORANGE"),
  createData("「宇宙戦艦ヤマト」より 序曲～宇宙戦艦ヤマト"),
  createData("扉"),
  createData("情熱大陸"),
  createData("真田丸 メインテーマ"),
  createData("夜空ノムコウ"),
  createData("銀河鉄道999"),
  createData("見上げてごらん夜の星を"),
  createData("木綿のハンカチーフ"),
  createData("アナザー・スカイ"),
  createData("WITH ONE WISH"),
  createData("ヒカリノアトリエ"),
  createData("「美女と野獣」メドレー"),
  createData("「パイレーツ・オブ・カリビアン」メドレー"),
  createData("しあわせの花"),
  createData("若い広場"),
  createData("津軽海峡・冬景色"),
  createData("めざせポケモンマスター -20th Anniversary-"),
  createData("HANABI"),
  createData("やってみよう"),
  createData("明日はどこから"),
  createData("ジュラシックパークより テーマ"),
  createData("vs ～知覚と快楽の螺旋～"),
  createData("ドクターXのテーマ"),
  createData("ダンシング・ヒーロー"),
  createData("負けないで"),
  createData("Paradise Has No Border"),
  createData("OMENS OF LOVE"),
  createData("ウイスキーが、お好きでしょ"),
  createData("英雄の証"),
  createData("夜桜お七"),
  createData("気まぐれロマンティック"),
  createData("アイデア"),
  createData("残酷な天使のテーゼ～魂のルフラン"),
  createData("クリスマス・ファンタジー・メドレー"),
  createData("YOUNG MAN(Y.M.C.A)"),
  createData("どんなときも"),
  createData("上を向いて歩こう"),
  createData("イルミネーション"),
  createData("ひと夏の経験"),
  createData("ピンク・レディー・メドレー"),
  createData("晴天 -Hale Sola-"),
  createData("ルパン三世のテーマ '78"),
  createData("Sing Sing Sing"),
];

const challenge100 = [
  createData("世界に一つだけの花"),
  createData("ルパン三世'78", "JEF2010 出場曲"),
  createData("イエスタデイ・ワンス・モア"),
  createData("夢をかなえてドラえもん"),
  createData("宝島"),
  createData("Smile", "JEF2011 北陸地区大会 金賞受賞曲"),
  createData("不思議の国のアリス"),
  createData("Round Dance", "JEF2012 出場曲"),
  createData("OMENS OF LOVE"),
  createData("さかさまの空"),
  createData('Take the "A" Train', "JEF2013 出場曲"),
  createData("赤鼻のトナカイ"),
  createData("Departure"),
  createData("Bear#5", "JEF2014 北陸地区大会 銀賞受賞曲"),
  createData("レット・イット・ゴー ～ありのままで～"),
  createData("SMACK OUT", "EF2015 北陸地区大会 銀賞受賞曲"),
  createData("FLY HIGH"),
  createData("THEME FOR B.B.S.", "EF2016 北陸地区大会 審査員特別賞受賞曲"),
  createData("プレゼント"),
  createData("I Wish For You"),
  createData("海の声"),
  createData(
    "Everyone's Song、千利休、小野妹子、本能寺の変",
    "三国中学校テーマソング、後3曲エグスプロージョンの踊る授業シリーズ"
  ),
  createData("Ocean flight", "EF2017 出場曲"),
  createData(
    "晴天 -Hale Sola-",
    "EF2017(アンサンブル) 北陸地区大会 金賞受賞曲"
  ),
  createData("しあわせの花"),
  createData("遠く遠く"),
  createData("Sunshine aura", "EF2018 出場曲"),
  createData("真夜中の510", "EF2018(アンサンブル) 北陸地区大会 金賞受賞曲"),
  createData(
    "AMUSE LIVE",
    "3人組ユニット「AMUSE」コンサートのライブで演奏した曲たち"
  ),
  createData("Neo Japanesque", "EF2019(アンサンブル) 北陸地区大会 金賞受賞曲"),
  createData("Into the Sky", "EF2019 北陸地区大会 金賞受賞曲"),
  createData(
    "ラストコンサート",
    "すずとものラストコンサート(2019/12/29)で演奏した曲たち"
  ),
];

const MusicList: React.FC<{ list: ReturnType<typeof createData>[] }> = ({
  list,
}) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableCell>No.</TableCell>
          <TableCell>曲名</TableCell>
          <TableCell>備考</TableCell>
        </TableHead>
        <TableBody>
          {list.map((music, index) => (
            <TableRow key="music">
              <TableCell sx={{ width: "5em" }}>{index + 1}</TableCell>
              <TableCell>{music.title}</TableCell>
              <TableCell>{music.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Page: NextPage = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Title name="My-Electone" />
      <Typography variant="title" align="center">
        My-Electone
      </Typography>

      <Box
        sx={{
          px: 5,
        }}
      >
        すずともが過去に弾いてきたエレクトーン楽曲をリストにしました。
        <br />
        自分の忘備録として残しておきます。
        <h2>いにしえのリスト</h2>
        <p>
          過去に弾いてきた曲リストです。以下の100曲チャレンジが始まった時期からは、編曲した曲が主にリストに入っています。
        </p>
        <MusicList list={challenge100} />
        <h2>100曲チャレンジリスト</h2>
        <p>
          中学校に入学してからエレクトーンを習うのをやめるまでに親に課せられた100曲チャレンジ。高専3年12月でエレクトーンの教室はやめてしまい、結局100曲達成はなりませんでしたが...（上の「いにしえのリスト」を足せば100行くでしょ...）
        </p>
        <MusicList list={musics} />
      </Box>
    </Box>
  );
};

export default Page;
