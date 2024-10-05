import React from "react";
import LineGraph from "../components/chart/Line";
import Grid from "@mui/material/Grid2";
import GenderPieChart from "../components/chart/Pie";
import { Box } from "@mui/material";
import RevenueBarChart from "../components/chart/Bar";
import OrdersBarChart from "../components/chart/OrderBar";

function DashboadPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <LineGraph />
        </Grid>
        <Grid size={6}>
          <RevenueBarChart />
        </Grid>
        <Grid size={6}>
          <GenderPieChart />
        </Grid>
        <Grid size={6}>
          <OrdersBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboadPage;
