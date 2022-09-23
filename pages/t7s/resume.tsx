import { useCallback, useMemo, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import Image from "next/future/image";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Pagination,
  Backdrop,
} from "@mui/material";
import Twitter from "@mui/icons-material/Twitter";

import Title from "../../components/title";
import Link from "../../src/link";

type StreamTweet = {
  data: {
    id: string;
    author_id: string;
  };
  includes?: {
    users?: Array<{
      id: string;
      name: string;
      username: string;
    }>;
    media?: Array<{
      type: string;
      url: string;
      width?: number;
      height?: number;
    }>;
  };
};

type Props = {
  data: StreamTweet[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("https://api.kamekyame.com/t7s-resume/data");
  // console.log(res);
  const data = Object.values(await res.json()) as StreamTweet[];

  return {
    props: { data },
    revalidate: 60,
  };
};

const Resume: React.FC<{ tweet: StreamTweet }> = ({ tweet }) => {
  const user = useMemo(() => {
    const authorId = tweet.data.author_id;
    const user = tweet.includes?.users?.find((user) => user.id === authorId);
    return user;
  }, [tweet]);
  const image = useMemo(() => {
    if (tweet.includes?.media && tweet.includes.media.length >= 1) {
      return tweet.includes.media[0];
    }
  }, [tweet]);
  const [isActive, setIsActive] = useState(true);

  const [backDropOpen, setBackDropOpen] = useState(false);
  const handleClose = useCallback(() => {
    setBackDropOpen(false);
  }, [setBackDropOpen]);
  const handleToggle = useCallback(() => {
    setBackDropOpen((open) => !open);
  }, [setBackDropOpen]);
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
      }}
    >
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ color: "#A0A0A0", fontSize: "0.5em" }}>
            支配人名（Twitter名）
          </Box>
          <Box
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {user?.name}
          </Box>
        </Box>
        {image &&
          (isActive ? (
            <>
              <Image
                src={image.url}
                width={image.width ?? 1080}
                height={image.height ?? 1920}
                alt="履歴書画像"
                style={{ width: "100%", height: "auto" }}
                onError={() => {
                  setIsActive(false);
                }}
                onClick={() => {
                  console.log("clicked!!");
                  handleToggle();
                }}
              />
              <Backdrop
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={backDropOpen}
                onClick={handleClose}
              >
                <Image
                  src={image.url}
                  width={image.width ?? 1080}
                  height={image.height ?? 1920}
                  alt="履歴書画像"
                  style={{
                    width: "90vw",
                    height: "90vh",
                    objectFit: "contain",
                  }}
                />
              </Backdrop>
            </>
          ) : (
            <Box sx={{ color: "#A0A0A0" }}>ツイートは削除されました。</Box>
          ))}
      </CardContent>
      <Box sx={{ flexGrow: "1" }} />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        {isActive && (
          <Box
            component="a"
            href={`https://twitter.com/_/status/${tweet.data.id}`}
            target="_blank"
            color="inherit"
          >
            <Twitter />
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

const num = 30;

const Page: NextPage<Props> = ({ data: allData }) => {
  const [page, setPage] = useState(1);
  const paginationHandleChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // useEffect(() => {
  //   console.log(allData);
  // }, [allData]);
  const data = useMemo(() => {
    allData.sort(
      (a, b) => (b.data.id > a.data.id ? 1 : -1) // IDが大きい順に並べる（新着順）
    );
    // console.log(allData);
    return allData.slice((page - 1) * num, page * num);
  }, [allData, page]);
  const pageCount = useMemo(() => {
    return Math.ceil(allData.length / num);
  }, [allData]);

  return (
    <Box
      sx={{
        mb: 3,
        width: "95%",
        mx: "auto",
      }}
    >
      <Title name="ナナシス履歴書ギャラリー" />
      <Typography variant="title" align="center">
        ナナシス履歴書ギャラリー
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          mb: 3,
        }}
      >
        支配人がTwitterにあげた履歴書をギャラリーにしました。
        <br />
        「#支配人履歴書」「#ナナシス履歴書」等のタグ付きのツイートを収集しています。
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={paginationHandleChange}
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            my: 2,
            justifyContent: "center",
          }}
        >
          {data.map((tweet) => {
            return <Resume key={tweet.data.id} tweet={tweet} />;
          })}
        </Box>
        <Pagination
          count={pageCount}
          page={page}
          onChange={paginationHandleChange}
        />
      </Box>
      <Box>
        <h3>表示画像</h3>
        このギャラリーで表示される画像は、ツイートに添付されている最初の画像になります。
        <br />
        ナナシス履歴書をTwitterで投稿する際には、履歴書の画像が最初になるように投稿お願いします。
        <h3>収集条件</h3>
        以下の条件をすべて満たしているツイートが収集対称になります。
        <br />
        しかし収集サーバの稼働状況などにより、収集漏れが発生する可能性があります。
        <ul>
          <li>
            #支配人履歴、#支配人履歴書、#ナナシス履歴書
            のハッシュタグがついている
            <br /> または <br />
            ツイートに「履歴書」「支配人」「ナナシス」「作成」「更新」等の文字が含まれている
          </li>
          <li>ツイート時点でアカウントに鍵がかけられていないこと</li>
          <li>ツイートに画像が含まれていること</li>
        </ul>
        <h3>お問い合わせ</h3>
        ナナシス履歴書ギャラリーに関するお問い合わせ（投稿・削除依頼）等はすずとものTwitter（
        <Link href="https://twitter.com/SuzuTomo2001" target="_blank">
          @SuzuTomo2001
        </Link>
        ）までお願いします。できる限り対処させていただきます。
      </Box>
    </Box>
  );
};

export default Page;
