import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=c3d825&secondary.color=d80faa
// 若草色：#c3d825(https://www.colordic.org/w)
const theme = createTheme({
  palette: {
    primary: {
      main: "#c3d825",
      light: "#f9ff5f",
      dark: "#8fa700",
      contrastText:"#000000",
    },
    secondary: {
      main: '#d80faa',
      light: '#ff5abc',
      dark: '#a2007b',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;