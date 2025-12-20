import { createClient } from "microcms-js-sdk";

const API_KEY = process.env.MICROCMS_API_KEY;

export const client = API_KEY
  ? createClient({
      serviceDomain: "kamekyame",
      apiKey: API_KEY,
    })
  : undefined;

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
export type BlogArticleLink = { fieldId: "articleLink"; article: IBlog };

export type IBlog = {
  title: string;
  body: (BlogRichEditor | BlogHTML | BlogArticleLink)[];
  tag: string[];
} & ListBase;

export type WebhookData = {
  service: string;
  api: string;
  id: string;
};
