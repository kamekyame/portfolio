import Head from "next/head";

export default function App({ name }: { name: string }) {
  return (
    <Head>
      <title>{name} - sztm-blog</title>
    </Head>
  );
}
