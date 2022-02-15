import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages: { name: string; href: string }[] = [
  { name: "blog", href: "/blog" },
  { name: "tools", href: "/tools" },
  { name: "sztm-bot", href: "/sztm-bot" },
  { name: "about", href: "/about" },
];

export default function App() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
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
                <Link href={page.href} passHref>
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
        <Link href="/" passHref>
          <Typography
            variant="h6"
            noWrap
            component={Button}
            color="inherit"
            sx={{
              mr: 4,
              display: "flex",
            }}
          >
            すずとものブログ
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Link key={page.name} href={page.href} passHref>
              <Button onClick={handleCloseNavMenu} color="inherit">
                {page.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
