import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=c3d825&secondary.color=d80faa
// 若草色：#c3d825(https://www.colordic.org/w)
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#c3d825",
      light: "#f9ff5f",
      dark: "#8fa700",
      contrastText: "#000000",
    },
    secondary: {
      main: "#d80faa",
      light: "#ff5abc",
      dark: "#a2007b",
      contrastText: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#333",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // title: "h2",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "::-webkit-scrollbar": {
            backgroundColor: "black",
          },
          "::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: "#c3d825",
            minHeight: "24px",
            border: "4px solid black",
          },
        },
        html: {
          scrollPaddingTop: "64px",
        },
      },
    },
  },
  typography: {
    h1: {
      fontWeight: undefined,
      fontSize: "2rem",
      margin: "2rem 0 2rem 0",
      letterSpacing: "0.1rem",
    },
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: false;
    lg: false;
    xl: false;
    // mobile: true;
    // desktop: true;
  }
}

export default theme;
