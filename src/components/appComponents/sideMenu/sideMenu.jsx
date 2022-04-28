import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { blueGrey, green } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import Link from "next/link";
import baseOptions from "../../../../styles/theme/baseOptions";
import darkTheme from "../../../../styles/theme/darkTheme";

const SidebarMenu = ({ showMenu, drawerWidth }) => {
  const content = [
    {
      title: "Search",
      icon: <SearchIcon />,
      link: "/app",
      backgroundColor: green[400],
      button: true,
      separatorAfter: false,
    },
    {
      title: "My diet",
      icon: <StickyNote2Icon />,
      link: "/app/diet",
      backgroundColor: blueGrey,
      button: false,
      separatorAfter: false,
    },
    {
      title: "Favorites",
      icon: <FavoriteIcon />,
      link: "/app/favorites",
      backgroundColor: blueGrey,
      button: false,
      separatorAfter: true,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      link: "/app/settings",
      backgroundColor: blueGrey,
      button: false,
      separatorAfter: false,
    },
  ];

  return (
    <>
      <ThemeProvider theme={createTheme(baseOptions, darkTheme)}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: blueGrey[900],
              borderRightColor: "divider",
              borderRightStyle: "solid",
            },
          }}
          open={showMenu}
          variant="persistent"
          anchor="left"
        >
          <Box
            sx={{
              mb: 3,
              mt: 20,
            }}
          >
            {content.map((el, index) => (
              <div key={index}>
                <Link
                  href={el.link}
                  style={{ textDecoration: "none" }}
                  passHref
                >
                  <a>
                    <Button
                      startIcon={el.icon}
                      variant="menuButtonDark"
                      color="primary"
                      sx={{
                        my: 0.5,
                        mx: 3,
                        py: 0.5,
                        px: 3,

                        ...(el.button && {
                          backgroundColor: green[500],
                          fontWeight: 600,
                          mb: 3,
                          "&:focus": {
                            backgroundColor: green[500],
                          },
                          "&:hover": {
                            backgroundColor: green[700],
                          },
                        }),
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>{el.title}</Box>
                    </Button>
                    {el.separatorAfter ? (
                      <Divider sx={{ mt: 3, mb: 2 }} variant="middle" />
                    ) : null}
                  </a>
                </Link>
              </div>
            ))}
          </Box>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default SidebarMenu;
