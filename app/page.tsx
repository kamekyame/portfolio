"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Title from "../components/title";

import GitHub from "assets/icons/icon-github-white.svg";
import { CgChevronRight } from "react-icons/cg";
import Logo from "../public/logo.svg";

import s from "./page.module.scss";

const Welcome = () => {
  return (
    <div className={s["welcome"]}>
      <div className={s["logo-icon"]}>
        <Logo />
      </div>
      {"Welcome to sztm's portfolio"}
    </div>
  );
};

const Profile = () => {
  return (
    <div className={s["profile"]}>
      プログラミングとか音楽とかゲームとかいろいろ浅くやってます。
      <table className={s["table"]}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>すずとも</td>
          </tr>
          <tr>
            <th>Sub Name</th>
            <td>kamekyame</td>
          </tr>
          <tr>
            <th>From</th>
            <td>福井</td>
          </tr>
          <tr>
            <th>Birth</th>
            <td>11/6</td>
          </tr>
          <tr>
            <th>Programming Skil</th>
            <td>
              TS, JS, C++, C#
              <br />
              Deno, Angular, React, Unity, Arduino, Mbed
            </td>
          </tr>
          <tr>
            <th>Hobby</th>
            <td>エレクトーン</td>
          </tr>
          <tr>
            <th>Experience</th>
            <td>
              エレクトーンコンクール（ソロ・アンサンブル）
              <br />
              高専ロボコン
              <br />
              回路設計・作成
              <br />
              自サイト開発・運用
              <br />
              X（旧 Twitter）Bot 作成
            </td>
          </tr>
          <tr>
            <th>Company</th>
            <td>jig.jp</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Projects = () => {
  return (
    <div className={s["projects"]}>
      これまでに作成したツールや参加しているプロジェクト等の一覧です
      <ul className={s["list"]}>
        <li>
          <div className={s["icon"]}>
            <Image
              src="https://kakomimasu.com/img/kakomimasu-icon.png"
              alt=""
              width="24"
              height="24"
            />
          </div>
          <div className={s["title"]}>
            <Link href="https://kakomimasu.com">囲みマス</Link>
            <Link
              title="囲みマスのGitHubページ"
              className={s["title-icon"]}
              href="https://github.com/kakomimasu"
            >
              <GitHub />
            </Link>
          </div>
          <div className={s["detail"]}>
            コロナによって中止になった高専プロコン2020
            競技部門をオンライン上でプレイ可能にするプロジェクト
            <br />
            サーバ（server）・フロント（viewer）の開発を主に担当
          </div>
        </li>

        <li>
          <div className={s["title"]}>
            <Link href="/t7s/t7s-electone-project" color="inherit">
              t7s Electone Project
            </Link>
          </div>
          <div className={s["detail"]}>
            スマホリズムゲーム
            <Link href="https://t7s.jp">
              「Tokyo 7thシスターズ」（通称、t7s・ナナシス）
            </Link>
            で制作されている楽曲をエレクトーンでアレンジするプロジェクト
            <br />
            参加者募集中です！笑
          </div>
        </li>
        <li>
          <div className={s["title"]}>
            <Link href="/t7s/db" color="inherit">
              t7s Database
            </Link>
          </div>
          <div className={s["detail"]}>
            ナナシスのキャラ・曲情報をもとに検索できるシステム
          </div>
        </li>
        <li>
          <div className={s["title"]}>
            <Link href="/el/domino-define" color="inherit">
              Domino用エレクトーン音源定義ファイル
            </Link>
          </div>
          <div className={s["detail"]}>
            MIDI編集ソフト
            <Link href="https://takabosoft.com/domino">「Domino」</Link>
            でエレクトーン音源を扱いやすくする音源定義ファイルを作成
          </div>
        </li>
        <li>
          <div className={s["title"]}>
            <Link href="/contents/kosen-calendar">高専カレンダー</Link>
            <Link
              title="高専カレンダーのGitHubページ"
              className={s["title-icon"]}
              href="https://github.com/kamekyame/kosen-calendar"
            >
              <GitHub />
            </Link>
          </div>
          <div className={s["detail"]}>
            各高専の行事予定をical形式で提供するプロジェクト。
            <br />
            対応高専は限られているが、スクレイピングスクリプトとGithub
            Actionsの活用により予定変更時にも対応
          </div>
        </li>
      </ul>
    </div>
  );
};

const Blog = () => {
  return (
    <div className={s["blog"]}>
      <div>すずとものブログ</div>
      <div className={s["content"]}>
        日々、過ごしていて感じたこと
        <br />
        ついったー には書けないようなこと
        <br />
        などなど、気が向いたときに綴っています
      </div>
      <div className={s["next-wrapper"]}>
        <Link href="/blog" className={s["next"]}>
          ブログはこちらから
          <CgChevronRight className={s["icon"]} size={24} />
        </Link>
      </div>
    </div>
  );
};

const pages: {
  id: string;
  title: string;
  component: React.FC;
  ref: React.RefObject<HTMLDivElement>;
}[] = [
  {
    id: "welcome",
    title: "Welcome",
    component: Welcome,
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    id: "profile",
    title: "Profile",
    component: Profile,
    ref: React.createRef<HTMLDivElement>(),
  },

  {
    id: "projects",
    title: "Projects",
    component: Projects,
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    id: "blog",
    title: "Blog",
    component: Blog,
    ref: React.createRef<HTMLDivElement>(),
  },
];

export default function Page() {
  const [nowPageInt, setNowPageInt] = useState<number>(0);

  useEffect(() => {
    const threshold = 0.3;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const target = entry.target;
          if (ratio > threshold) {
            target.classList.add(s["active"]);
            if (target instanceof HTMLElement) {
              setNowPageInt(Number(target.dataset.i));
        }
          } else {
            entry.target.classList.remove(s["active"]);
          }
        });
      },
      { threshold }
    );
    pages.forEach((page) => {
      if (!page.ref.current) return;
      intersectionObserver.observe(page.ref.current);
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className={clsx(s["contents"])} style={{}}>
      <div className={s["sidebar"]}>
        <div className={s["sidebar-inner"]}>
          <div className={s["tabs"]}>
            <div className={s["tabs-link"]}>
              {pages.map((page, i) => (
                <Link
                  className={clsx(
                    s["link"],
                    s["link-tab"],
                    nowPageInt === i && s["active"]
                  )}
                  key={page.id}
                  href={`#${page.id}`}
                  replace
                >
                  {page.title}
                </Link>
              ))}
            </div>
            <div>
              <div // バー
                className={s["tab-bar"]}
                style={
                  {
                    "--page-length": pages.length,
                    "--now-page": nowPageInt,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className={s["main-contents"]}>
        {/* 右側コンテンツ */}
        {pages.map((page, i) => {
          return (
            <div
              data-i={i}
              className={clsx(s["page"])}
              key={page.id}
              ref={page.ref}
            >
              <div id={page.id} className={s["scroll-anchor"]} />
              <page.component />
            </div>
          );
        })}
      </div>
    </div>
  );
}
