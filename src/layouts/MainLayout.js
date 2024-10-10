import { Box, Container, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 80;

function MainLayout() {
  return (
    <div>
      <MainHeader />

      <Sidebar />

      <Container
        sx={{
          display: "flex",
          mt: `${drawerWidth}px`,
          ml: `${drawerWidth * 3}px`,
          flex: "1",
        }}
      >
        <Outlet />
      </Container>

      <MainFooter />
    </div>
  );
}

export default MainLayout;
