import React, { useState } from "react";
import LineGraph from "../components/chart/Line";
import Grid from "@mui/material/Grid2";
import GenderPieChart from "../components/chart/Pie";
import { Stack } from "@mui/material";
import RevenueBarChart from "../components/chart/Bar";
import MyDateRangePicker from "../components/DateRangePicker";

import Dashboard from "../components/Dashboard";

// Helper function to create day list from range:

function generateDateRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // Lấy định dạng yyyy-MM-dd
    dateArray.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1); // Tăng lên 1 ngày
  }

  return dateArray;
}

function DashboadPage() {
  const [dateRange, setDateRange] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeDateRange = (formatStartDate, formatEndDate) => {
    const selectedDateRange = generateDateRange(formatStartDate, formatEndDate);
    setStartDate(formatStartDate);
    setEndDate(formatEndDate);
    setDateRange(selectedDateRange);
  };

  return (
    <Stack>
      <MyDateRangePicker onChange={handleChangeDateRange} />
      <Dashboard startDate={startDate} endDate={endDate} />

      <Grid container spacing={2}>
        <Grid size={12}>
          <RevenueBarChart
            dateRange={dateRange}
            startDate={startDate}
            endDate={endDate}
          />
        </Grid>
        <Grid size={6}>
          <GenderPieChart />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default DashboadPage;
