import { Box, Container, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 80;

function MainLayout() {
  return (
    <Stack>
      <MainHeader />
      <Container sx={{ display: "flex", mt: `${drawerWidth}px` }}>
        <Sidebar />

        {/* <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: `${drawerWidth}px`,
            mt: `${drawerWidth - 80}px`,
            padding: 3,
          }} */}
        {/* > */}
        {/* <Box component="main" sx={{ mt: `${drawerWidth}px`, flexGrow: 1 }}> */}

        <Outlet />
      </Container>

      {/* </Box> */}

      {/* </Box> */}
      {/* </Container> */}

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
