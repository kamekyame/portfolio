import { darkScrollbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=c3d825&secondary.color=d80faa
// 若草色：#c3d825(https://www.colordic.org/w)
const theme = createTheme({
  palette: {
    mode: "dark",
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
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title: "h2",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
        html: {
          scrollPaddingTop: "64px",
        },
      },
    },
  },
  typography: {
    title: {
      fontSize: "3rem",
      margin: "",
    },
  },
  breakpoints: {
    // values: {
    //   // mobile: 0,
    //   // desktop: 1024,
    // },
  },
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }

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

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

export default theme;
