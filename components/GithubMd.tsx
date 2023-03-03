import React from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import DOMParserReact from "dom-parser-react";

import Link from "../src/link";

const parser: React.ComponentProps<typeof DOMParserReact>["components"] = {
  a: ({ href, children }) => {
    return (
      <Link href={href} color="inherit">
        {children}
      </Link>
    );
  },
  img: ({ src, ...props }) => {
    return (
      <Box
        component="img"
        sx={{
          maxWidth: "100%",
          maxHeight: "50vh",
        }}
        src={src}
        alt="image"
      />
    );
  },
  table: ({ children }) => {
    return (
      <Box
        component="table"
        sx={{
          mx: "auto",
          borderCollapse: "collapse",
        }}
      >
        {children}
      </Box>
    );
  },
  td: ({ children }) => {
    return (
      <Box
        component="td"
        sx={{
          border: "1px solid gray",
          p: 1,
        }}
      >
        {children}
      </Box>
    );
  },
  th: ({ children }) => {
    return (
      <Box
        component="th"
        sx={{
          border: "1px solid gray",
          p: 1,
        }}
      >
        {children}
      </Box>
    );
  },
  strong: ({ children }) => {
    return <Box component="strong">{children}</Box>;
  },
  blockquote: ({ children }) => {
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
        {children}
      </Box>
    );
  },
  h1: () => <></>,
  h2: ({ children }) => (
    <Box component="h2" sx={{ my: 2, px: 1, borderBottom: "2px solid" }}>
      {children}
    </Box>
  ),
  h3: ({ children }) => (
    <Box component="h3" sx={{ my: 2 }}>
      {children}
    </Box>
  ),
  h4: ({ children }) => (
    <Box component="h4" sx={{ my: 2 }}>
      {children}
    </Box>
  ),
  h5: ({ children }) => {
    return (
      <Box component="h5" sx={{ my: 0.5 }}>
        {children}
      </Box>
    );
  },
  p: ({ children }) => {
    return (
      <Box component="p" sx={{ my: 1 }}>
        {children}
      </Box>
    );
  },
};

const Markdown: NextPage<{ html: string }> = ({ html }) => {
  return (
    <Box component={DOMParserReact} source={html} components={parser}></Box>
  );
};

export default Markdown;
