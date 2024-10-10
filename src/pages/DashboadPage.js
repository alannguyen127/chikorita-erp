import React from "react";
import LineGraph from "../components/chart/Line";
import Grid from "@mui/material/Grid2";
import GenderPieChart from "../components/chart/Pie";
import { Box, Stack } from "@mui/material";
import RevenueBarChart from "../components/chart/Bar";
import OrdersBarChart from "../components/chart/OrderBar";
import MyDateRangePicker from "../components/DateRangePicker";

function DashboadPage() {
  return (
    <Stack>
      <MyDateRangePicker />
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
    </Stack>
  );
}

export default DashboadPage;
