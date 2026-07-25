import { Metadata } from "next";
import Contents from "./Contents";

export default function Page() {
  return <Contents />;
}

export const metadata: Metadata = {
  title: "kosen-calendar",
};
