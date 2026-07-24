import Title from "../components/title";

import s from "./not-found.module.scss";

export default function Page() {
  return (
    <div className={s["contents"]}>
      <Title name="404 Not Found" />
      <div className={s["title"]}>
        <h1>よんまるよん</h1>
      </div>
      <div>404 Not Found</div>
    </div>
  );
}
