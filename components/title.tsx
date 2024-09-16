import Head from "next/head";

type Props = {
  name: string;
  thumbnailUrl?: string;
  description?: string;
  type?: "website" | "article" | "blog" | "product";
  twitterCard?: "summary" | "summary_large_image";
};

export default function App({
  name,
  description: description_,
  type,
  thumbnailUrl,
  twitterCard,
}: Props) {
  const title = `${name} - sztm-blog`;
  const description = description_ || "すずとものブログです";
  const host = process.env.NEXT_PUBLIC_VERCEL_URL;
  const ogpImageUrl = `http${host ? "s" : ""}://${host ?? "localhost:3000"}/${
    thumbnailUrl || "ogp.jpg"
  }`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:site_name" content="sztm-blog" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={ogpImageUrl} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content={twitterCard || "summary"} />
      <meta name="twitter:site" content="@SuzuTomo2001" />
    </Head>
  );
}
