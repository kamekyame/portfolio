import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const draftKey = req.query.draftKey as string;
  res.setPreviewData({ draftKey });
  res.redirect(`/blog/${id}`);
}
