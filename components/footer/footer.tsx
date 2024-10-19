"use client";

import IconTwitterX from "assets/icons/icon-twitter-x.svg";
import IconGithub from "assets/icons/icon-github-white.svg";

import s from "./footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={s["footer"]}>
      <div className={s["contents"]}>
        <div className={s["copylight-text"]}>©2024 kamekyame</div>
        <div className={s["icons"]}>
          <Link
            title="すずとものついったー(X)"
            href="https://x.com/SuzuTomo2001"
            className={s["icon"]}
          >
            <IconTwitterX />
          </Link>
          <Link
            title="GitHubページ"
            href="https://github.com/kamekyame"
            className={s["icon"]}
          >
            <IconGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
