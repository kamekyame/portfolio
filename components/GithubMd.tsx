import React from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
} from "html-react-parser";

import Link from "../src/link";

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!("attribs" in domNode)) return domNode;
    if (domNode.name === "a") {
      return (
        <Link href={domNode.attribs.href} color="inherit" target="_blank">
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Link>
      );
    } else if (domNode.name === "img") {
      return (
        <Box
          component="img"
          sx={{
            maxWidth: "100%",
            maxHeight: "50vh",
          }}
          src={domNode.attribs.src}
          alt="image"
        />
      );
    } else if (domNode.name === "table") {
      return (
        <Box
          component="table"
          sx={{
            mx: "auto",
            borderCollapse: "collapse",
          }}
        >
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "td") {
      return (
        <Box
          component="td"
          sx={{
            border: "1px solid gray",
            p: 1,
          }}
        >
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "th") {
      return (
        <Box
          component="th"
          sx={{
            border: "1px solid gray",
            p: 1,
          }}
        >
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "blockquote") {
      return (
        <Box
          component="blockquote"
          sx={{
            m: 1,
            p: 1,
            pl: 2,
            backgroundColor: "#E0E0E0",
            borderLeft: (t) => `3px solid ${t.palette.primary.main}`,
          }}
        >
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "h1") return <></>;
    else if (domNode.name === "h2") {
      return (
        <Box component="h2" sx={{ my: 2, px: 1, borderBottom: "2px solid" }}>
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "h3") {
      return (
        <Box component="h3" sx={{ my: 2 }}>
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "h4") {
      return (
        <Box component="h4" sx={{ my: 2 }}>
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "h5") {
      return (
        <Box component="h5" sx={{ my: 0.5 }}>
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    } else if (domNode.name === "p") {
      return (
        <Box component="p" sx={{ my: 1 }}>
          {domToReact(domNode.children as DOMNode[], parserOptions)}
        </Box>
      );
    }
  },
};

const Markdown: NextPage<{ html: string }> = ({ html }) => {
  return <Box>{parse(html, parserOptions)}</Box>;
};

export default Markdown;
