import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState(
    localStorage.getItem("username")
  );
  const role = localStorage.getItem("role");
  const settings = ["Profile", "Logout"];
  const pages = [];
  if (role === "admin")
    pages.push("User Details","Projects", "Certifications", "Skills", "AddUser");
  if (role === "User") pages.push("Projects", "Certifications", "Skills","AddSkills");
  if (role === "Approver") pages.push("Approve Skills");
  const profileIcon = profileName ? profileName.charAt(0).toUpperCase() : "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    navigate("/profile");
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setProfileName(null);
    handleCloseUserMenu();
    navigate("/");
  };

  const handleCloseNavMenu = async (page) => {
    setAnchorElNav(null);
    if (role === "User") {
      const userId = localStorage.getItem("userid");
      navigate(`/projects/${userId}`, { state: { project: page } });
    }
    if (role === "admin") {
      navigate(`/adminpage`, { state: { project: page } });
    }
    if (role === "Approver") {
      navigate(`/approverpage`, { state: { project: page } });
    }
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <LibraryBooksIcon sx={{ display: { xs: "none", md: "flex" }, m: 2 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Skill Matrix
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
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
              <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <LibraryBooksIcon sx={{ display: { xs: "flex", md: "none" }, mr: 2 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Skill Matrix
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handleCloseNavMenu(page)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box
  sx={{
    flexGrow: 0,
    display: "flex",
    alignItems: "center",
    marginRight: localStorage.getItem("username") ? "0.5rem" : "0",
  }}
>
  {localStorage.getItem("username") && (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{profileIcon}</Avatar>
        </IconButton>
      </Tooltip>
      <span style={{ marginLeft: "0.5rem" }}>
        {localStorage.getItem("username")}
      </span>
    </>
  )}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={
                  setting === "Logout" ? handleLogout : handleCloseUserMenu
                }
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
