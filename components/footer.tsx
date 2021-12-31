import { styled } from "@mui/material/styles";

const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
}))

export default function App() {
  return <Footer>
    <p>@2022 kamekyame</p>
  </Footer>

}