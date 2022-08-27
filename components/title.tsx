import Head from "next/head";

type Props = {
  name: string;
  thumbnailUrl?: string;
  description?: string;
  type?: "website" | "article" | "blog" | "product";
};

export default function App({ name, description, type, thumbnailUrl }: Props) {
  return (
    <Head>
      <title>{name} - sztm-blog</title>
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:site_name" content="sztm-blog" />
      <meta property="og:title" content={name} />
      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/${
          thumbnailUrl || "ogp.jpg"
        }`}
      />
      <meta
        property="og:description"
        content={description || "すずとものブログです。"}
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@SuzuTomo2001" />
    </Head>
  );
}
