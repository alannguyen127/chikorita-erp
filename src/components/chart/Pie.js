import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";

// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = () => {
  const data = {
    labels: ["Nam", "Nữ", "Không có thông tin"],
    datasets: [
      {
        label: "Giới tính khách hàng",
        data: [450, 500, 50], // Số lượng khách hàng: Nam, Nữ và Không có thông tin
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Màu cho "Nam"
          "rgba(255, 99, 132, 0.6)", // Màu cho "Nữ"
          "rgba(201, 203, 207, 0.6)", // Màu cho "Không có thông tin"
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(201, 203, 207, 1)",
        ],
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
        text: "Biểu đồ phân loại giới tính khách hàng",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label;
            const value = tooltipItem.raw; // Lấy số lượng khách hàng
            return `${label}: ${value} khách hàng`; // Hiển thị số lượng khách hàng
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "50%",
        }}
      >
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default GenderPieChart;
