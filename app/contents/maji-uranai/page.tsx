import { Metadata } from "next";
import Contents, { Data } from "./Contents";

import s from "./page.module.scss";

export default async function Page() {
  const res = await fetch("https://api.kamekyame.com/maji-uranai/data");
  if (!res.ok) {
    return null;
  }
  const data: Data = await res.json();

  return (
    <div className={s["contents"]}>
      <div className={s["title"]}>
        <h1>まぁじ占いビューア</h1>
      </div>
      <div className={s["notice"]}>
        まぁじ占い終了しました。過去のデータは見れますが更新はありません。
      </div>
      <Contents data={data} />
    </div>
  );
}
export const metadata: Metadata = {
  title: "まぁじ占いビューア",
};
