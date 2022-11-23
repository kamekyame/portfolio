import { createHmac, timingSafeEqual } from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

import { WebhookData } from "../../../src/microCms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // signature 検証
  // https://document.microcms.io/manual/webhook-setting
  console.log(req.headers, req.body);
  const signature = req.headers["x-microcms-signature"];
  const webhookSecret = process.env.MICROCMS_BLOG_WEBHOOK_SECRET;

  if (typeof signature !== "string" || webhookSecret === undefined) {
    throw new Error("Invalid signature header or webhook secret");
  }
  const expectedSignature = createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    res.status(401);
    return;
  }

  const data: WebhookData = req.body;
  if (
    data.service !== "kamekyame" ||
    data.api !== "blog" ||
    data.id === undefined
  ) {
    throw new Error("Invalid data.service or data.api or data.id");
  }
  res.revalidate("/blog");
  res.revalidate("/blog/" + data.id);
  return res.json({ revalidated: true });
}
