import { Metadata } from "next";

import s from "./not-found.module.scss";

export default function Page() {
  return (
    <div className={s["contents"]}>
      <div className={s["title"]}>
        <h1>よんまるよん</h1>
      </div>
      <div>404 Not Found</div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "404 Not Found",
};
