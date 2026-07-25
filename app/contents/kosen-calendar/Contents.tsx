"use client";

import Link from "next/link";
import React from "react";

import Logo from "assets/kosen-calendar.svg";

import s from "./Contents.module.scss";

type Resource = { name: string; path: string };

const googleCalendarIframeUrl =
  "https://calendar.google.com/calendar/embed?wkst=1&ctz=Asia%2FTokyo&showPrint=0&title=kosen-calendar&showTz=0&src=ZGNvZTF0OWk5ZHZjMjY1MWxqcTNvYWJkdjd0dWhxNW9AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=OHNnczU3MmhiaXI4MWxxYXViNW84azF0OXBpNzBxZHRAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=NmZnNHZkM203MWk5Y2NrMTZ1NGlybXQ1Nmk2cmczY2FAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=bnNxbnRnbGZhaWlscjhzcmU4bzRkdTVsbmlybDQwaDlAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=aGllcmlvZDgxOHNna2pla2Q4aHR2djNrdWUwcWFycmpAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237cb342&color=%237986cb&color=%23ad1457&color=%23616161&color=%23616161";

const resources: Resource[] = [
  { name: "北九州高専", path: "kitakyusyu/kitakyusyu.ics" },
  { name: "福井高専", path: "fukui/fukui.ics" },
  { name: "石川高専2021", path: "ishikawa/ishikawa_2021.ics" },
  { name: "長岡高専", path: "nagaoka/nagaoka.ics" },
  { name: "津山高専", path: "tsuyama/tsuyama.ics" },
];

const githubIoBaseUrl =
  "https://raw.githubusercontent.com/kamekyame/kosen-calendar/main";
const githubUrl = "https://github.com/kamekyame/kosen-calendar";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={s["section-title"]}>
      <h2>{title}</h2>
    </div>
  );
};

export default function Page() {
  return (
    <div className={s["contents"]}>
      <div className={s["logo-wrapper"]}>
        <Logo />
      </div>
      <div className={s["section-wrapper"]}>
        <section>
          <SectionHeader title="kosen-calendarとは" />
          <div>
            学校の行事予定って配られるけど、毎年カレンダーに登録するの面倒くさくない？ときどき変更されるし...
            <br />
            そこで「kosen-calendar」の出番。各高専の行事予定をiCalendar形式にて公開しています！
            <br />
            icalは自動更新されるので、学期途中の変更にも対応！
          </div>
        </section>
        <section>
          <SectionHeader title="使い方" />
          <div>
            「対応高専」欄のURLをiCalendarに対応しているカレンダーに登録するだけ。
            <br />
            主なサービスについては以下に方法を書いておきます。
            <ul>
              <li>Outlook.com：「予定表を追加」→「Webから定期受信」</li>
              <li>
                Googleカレンダー：「他のカレンダー」横の＋マーク→「URLで追加」
              </li>
              <li>
                iPhoneカレンダー：iPhoneからこのページを開き、追加したい高専のURLをタップ
              </li>
            </ul>
          </div>
        </section>
        <section>
          <SectionHeader title="対応高専" />
          <table>
            <thead>
              <tr>
                <th>高専名</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => {
                return (
                  <tr key={resource.name}>
                    <td>{resource.name}</td>
                    <td>
                      <Link
                        href={`${githubIoBaseUrl}/${resource.path}`}
                      >{`${githubIoBaseUrl}/${resource.path}`}</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section>
          <SectionHeader title="カレンダープレビュー" />
          <iframe
            style={{
              width: "100%",
              minHeight: "400px",
              aspectRatio: "16/9",
              border: "none",
            }}
            src={googleCalendarIframeUrl}
          ></iframe>
        </section>
        <section>
          <SectionHeader title="協力お願い" />
          <div>
            まだ一部の高専しか作成できていません。協力してくださるよ という方は
            <Link href={githubUrl}>Github</Link>にてPull
            Requestを送ってください。
          </div>
        </section>
      </div>
    </div>
  );
}
