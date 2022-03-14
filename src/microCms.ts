import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "kamekyame",
  apiKey: process.env.MICROCMS_API_KEY || "invalid-api-key",
});

export type IList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

type ListBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type BlogRichEditor = { fieldId: "richEditor"; content: string };
export type BlogHTML = { fieldId: "html"; content: string };

export type IBlog = {
  title: string;
  body: (BlogRichEditor | BlogHTML)[];
} & ListBase;
