import * as fs from "fs";

import type { NextApiRequest, NextApiResponse } from "next";
import * as sharp from "sharp";

import { generateTextPath } from "../../../../src/svg";

const cwd = process.cwd();
const svg = fs.readFileSync(cwd + "/assets/t7s-counter-end.svg", "utf-8");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const diffEnd = req.query["diff-end"] ?? `0`;

  if (typeof diffEnd !== "string") {
    res.status(400).json({ error: "param is invalid" });
    return;
  }

  const addSvg = `<g transform="translate(450, 230)">
    ${generateTextPath(diffEnd, 500, 190, { align: "center" })}
  </g>`;
  const ogpSvg = svg.slice(0, -6) + addSvg + svg.slice(-6);

  const buffer = await sharp.default(Buffer.from(ogpSvg)).png().toBuffer();
  res.setHeader("Content-Type", "image/png");

  res.status(200).send(buffer);
}
