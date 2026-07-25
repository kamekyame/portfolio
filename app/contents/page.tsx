import type { Metadata } from "next";
import Link from "next/link";
import { contents } from "./data";

import v from "components/variables.module.scss";
import s from "./page.module.scss";

const sxs: { [key: string]: { backgroundColor: string; color: string } } = {
  normal: {
    backgroundColor: v.colorPrimary,
    color: v.colorPrimaryText,
  },
  el: {
    backgroundColor: v.colorSecondary,
    color: v.colorSecondaryText,
  },
  t7s: {
    backgroundColor: "#52f9f9",
    color: "black",
  },
};

export default function Page() {
  return (
    <div className={s["contents"]}>
      <div className={s["title"]}>
        <h1>Contents</h1>
      </div>
      <div className={s["items"]}>
        {contents.map((content) => {
          return (
            <Link
              className={s["item"]}
              href={content.href}
              key={content.href}
              style={
                {
                  "--bg-image": content.bgImage
                    ? `url(${content.bgImage})`
                    : "none",
                } as React.CSSProperties
              }
            >
              <div className={s["backdrop"]}></div>

              <div
                className={s["badge"]}
                style={
                  {
                    "--bg-color": sxs[content.type].backgroundColor,
                    "--color": sxs[content.type].color,
                  } as React.CSSProperties
                }
              >
                {content.type}
              </div>
              <div className={s["item-title"]}>
                {content.title.split(/(\n)/).map((i) => {
                  if (i === "\n") return <br key={i} />;
                  return <span key={i}>{i}</span>;
                })}
              </div>
              <div className={s["item-description"]}>{content.description}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Contents",
};
