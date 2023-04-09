import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Link from "../src/link";

const pages: { name: string; href: string }[] = [
  { name: "blog", href: "/blog" },
  { name: "contents", href: "/contents" },
  { name: "sztm-bot", href: "/sztm-bot" },
];

import Logo from "../public/logo.svg";

export default function App() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link href={page.href} underline="none" color="inherit">
                  <Box
                    color="inherit"
                    sx={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    {page.name}
                  </Box>
                  {/* <Typography component={Button} color="inherit">
                    {page.name}
                  </Typography> */}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Link href="/">
          <Avatar sx={{ mx: 2 }}>
            <Box sx={{ width: "100%" }} component={Logo} />
          </Avatar>
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              href={page.href}
              onClick={handleCloseNavMenu}
              color="inherit"
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
