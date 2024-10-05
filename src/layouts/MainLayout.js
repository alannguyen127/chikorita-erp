import { Box, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 120;

function MainLayout() {
  return (
    <Stack>
      <MainHeader />

      <Box sx={{ display: "flex", flexGrow: 1, minHeight: "100vh" }}>
        <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
          <Sidebar />
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth}px`,
            mt: `${drawerWidth - 80}px`,
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
