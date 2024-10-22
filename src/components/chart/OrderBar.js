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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersBarChart = () => {
  const data = {
    labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"],
    datasets: [
      {
        label: "Khách hàng cũ",
        data: [5, 10, 8, 12, 15, 18, 20],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Khách hàng mới",
        data: [5, 10, 10, 10, 10, 12, 15],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
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
        text: "Số lượng đơn hàng theo ngày",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + " đơn";
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
        width: "100%",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <Bar data={data} options={options} />
    </Box>
  );
};

export default OrdersBarChart;
