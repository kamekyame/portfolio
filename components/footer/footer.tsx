import IconTwitterX from "assets/icons/icon-twitter-x.svg";
import IconGithub from "assets/icons/icon-github-white.svg";

import s from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={s["footer"]}>
      <div className={s["contents"]}>
        <div className={s["copylight-text"]}>©2024 kamekyame</div>
        <div className={s["icons"]}>
          <a className={s["icon"]}>
            <IconTwitterX />
          </a>
          <a className={s["icon"]}>
            <IconGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
