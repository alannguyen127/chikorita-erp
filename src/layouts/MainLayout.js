import { Box, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 120;

function MainLayout() {
  return (
    <Stack sx={{ height: "100%" }}>
      <MainHeader />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
          <Sidebar />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth}px`,
            padding: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
