import * as fs from "fs";

import type { NextApiRequest, NextApiResponse } from "next";
import * as sharp from "sharp";

import { generateTextPath } from "../../../src/svg";

const cwd = process.cwd();
const svg = fs.readFileSync(cwd + "/assets/ogp_blog.svg", "utf-8");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const title = req.query.title;
  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "title is required" });
  } else {
    const addSvg = `<!-- 指定した文字列をSVGパスに変換 -->
      <g transform="translate(70, 150)">
        ${
      generateTextPath(title, 1060, 60, {
        lines: 4,
      })
    }
      </g>`;
    const ogpSvg = svg.slice(0, -6) + addSvg + svg.slice(-6);

    const buffer = await sharp.default(Buffer.from(ogpSvg)).png().toBuffer();
    res.setHeader("Content-Type", "image/png");

    res.status(200).send(buffer);
  }
}
