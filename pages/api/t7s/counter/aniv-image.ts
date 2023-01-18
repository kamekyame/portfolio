import * as fs from "fs";

import type { NextApiRequest, NextApiResponse } from "next";
import * as sharp from "sharp";

import { generateTextPath } from "../../../../src/svg";

const cwd = process.cwd();
const svg = fs.readFileSync(cwd + "/assets/t7s-counter-aniv.svg", "utf-8");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const aniv = req.query.aniv ?? `${0}`;
  const count = `ナナシスは 今日で ${req.query.count ?? 10000}日目`;

  if (
    typeof aniv !== "string" || typeof count !== "string"
  ) {
    res.status(400).json({ error: "param is invalid" });
  } else {
    const addSvgs = // 指定した文字列をSVGパスに変換
      [
        `<g transform="translate(450, 170)">
          ${generateTextPath(aniv, 400, 200, { align: "center" })}
        </g>`,
        `<g transform="translate(193, 450)">
          ${generateTextPath(count, 1000, 35, { align: "right" })}
        </g>`,
      ];
    const ogpSvg = svg.slice(0, -6) + addSvgs.join() + svg.slice(-6);

    const buffer = await sharp.default(Buffer.from(ogpSvg)).png().toBuffer();
    res.setHeader("Content-Type", "image/png");

    res.status(200).send(buffer);
  }
}
