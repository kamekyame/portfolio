import Head from "next/head";
import { useMemo } from "react";

type Props = {
  name: string;
  thumbnailUrl?: string;
  description?: string;
  type?: "website" | "article" | "blog" | "product";
};

export default function App({
  name,
  description: descriptopProp,
  type: typeProp,
}: Props) {
  const title = useMemo(() => `${name} - sztm-blog`, [name]);
  const description = useMemo(
    () => descriptopProp || "すずとものブログです。",
    [descriptopProp]
  );
  const type = useMemo(() => typeProp || "website", [typeProp]);
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="sztm-blog" />
      <meta property="og:title" content={name} />
      {/* <meta property="og:image" content={thumbnailUrl} /> */}
      {description && <meta property="og:description" content={description} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@SuzuTomo2001" />
    </Head>
  );
}
