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
      <div style={{ marginTop: "64px", position: "relative" }}>
        <Sidebar />
        <div
          className="p-[24px]"
          style={{ marginLeft: `${drawerWidth * 3}px` }}
        >
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
