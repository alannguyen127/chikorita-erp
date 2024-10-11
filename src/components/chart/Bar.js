import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";
import { fDate } from "../../utils/formatTime";
import { useFrappeGetCall } from "frappe-react-sdk";
import LoadingScreen from "../LoadingScreen";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// [fDate(new Date())]
const RevenueBarChart = ({ dateRange, startDate, endDate }) => {
  // console.log("RevenueBarChart", dateRange, dateRange.length);
  console.log(startDate, endDate);

  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.order.order.get_sales_data_by_date",
    { start_date: startDate, end_date: endDate }
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  const salesData = data?.message.sales_data;
  console.log("sale data", salesData);

  // if (error) {
  //   return <p>{error}</p>;
  // }

  const revenueData = {
    labels: dateRange.length > 0 ? dateRange : [],
    datasets: [
      {
        label: "Doanh thu",
        data: salesData ? salesData.map((sale) => sale.total_sales) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu theo ngày",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return fCurrency(value);
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        border: "2px solid #ccc",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        width: "90%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <Bar data={revenueData} options={options} />
    </Box>
  );
};

export default RevenueBarChart;
