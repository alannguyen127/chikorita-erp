import { Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"© "}
      {new Date().getFullYear()}
      {" Chikorita EatClean. All rights reserved."}
    </Typography>
  );
}

export default MainFooter;
