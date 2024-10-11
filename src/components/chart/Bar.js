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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueBarChart = () => {
  const data = {
    labels: [
      "01/10",
      "02/10",
      "03/10",
      "04/10",
      "05/10",
      "06/10",
      "07/10",
      "8/10",
      "01/10",
      "02/10",
      "03/10",
      "04/10",
      "05/10",
      "06/10",
      "07/10",
      "8/10",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: [
          30000000, 40000000, 50000000, 45000000, 60000000, 70000000, 80000000,
          30000000, 40000000, 50000000, 45000000, 60000000, 70000000, 80000000,
          30000000, 40000000,
        ],
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
      <Bar data={data} options={options} />
    </Box>
  );
};

export default RevenueBarChart;
