"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { type Sampler } from "tone";

import s from "./header-menu.module.scss";

import Logo from "public/logo.svg";
import Link from "next/link";

const keys: {
  key: string;
  shortBlackKey?: boolean;
  menu?: { name: string; href: string };
  playSound?: boolean;
}[] = [
  { key: "F2" },
  { key: "G2" },
  { key: "A2" },
  { key: "B2" },
  { key: "C3" },
  { key: "D3", shortBlackKey: true, menu: { name: "Blog", href: "/blog" } },
  {
    key: "E3",
    shortBlackKey: true,
    menu: { name: "Contents", href: "/contents" },
  },
  {
    key: "F3",
    shortBlackKey: true,
    menu: { name: "sztm-bot", href: "/sztm-bot" },
  },
  { key: "G3", shortBlackKey: true },
  { key: "A3", shortBlackKey: true },
  { key: "B3", shortBlackKey: true },
  { key: "C4", playSound: true },
  { key: "D4", playSound: true },
  { key: "E4", playSound: true },
  { key: "F4", playSound: true },
  { key: "G4", playSound: true },
  { key: "A4", playSound: true },
  { key: "B4", playSound: true },
];

export default function HeaderMenu() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const [piano, setPiano] = useState<Sampler>();

  const pianoInitialize = async (initialNote: string) => {
    const ToneSampler = (await import("tone")).Sampler;
    const piano = new ToneSampler({
      urls: {
        C4: "C4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
      onload: () => {
        setPiano(piano);
        piano.triggerAttackRelease(initialNote, "8n");
      },
    }).toDestination();
  };

  const playPiano = (note: string) => {
    if (!piano) {
      pianoInitialize(note);
    } else {
      piano.triggerAttackRelease(note, "8n");
    }
  };

  return (
    <div className={clsx(s["menu"], isShowMenu && s["open"])}>
      <button
        className={s["logo-button"]}
        onClick={() => setIsShowMenu((f) => !f)}
      >
        <div className={clsx(s["logo"])}>
          <Logo />
        </div>
        <div className={clsx(s["logo-text"])}>MENU</div>
      </button>
      <div className={clsx(s["opened-menu"])}>
        {keys.map(({ key, menu, shortBlackKey = false, playSound }) => {
          const isBlackKey = ["A", "B", "D", "E", "G"].includes(key[0]);

          return (
            <div
              key={key}
              className={clsx(s["key"], !!menu && s["key-after"])}
              onClick={() => {
                if (playSound) playPiano(key);
              }}
            >
              {menu && (
                <Link
                  href={menu.href}
                  tabIndex={isShowMenu ? 0 : -1}
                  className={clsx(s["key-menu"])}
                >
                  {menu.name}
                </Link>
              )}
              {isBlackKey && (
                <div
                  className={clsx(s["black-key"], shortBlackKey && s["short"])}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playSound) playPiano(`${key[0]}b${key[1]}`);
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
