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

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersBarChart = () => {
  // Dữ liệu cho số lượng đơn hàng theo ngày

  const data = {
    labels: ["01/10", "02/10", "03/10", "04/10", "05/10", "06/10", "07/10"], // Nhãn ngày
    datasets: [
      {
        label: "Khách hàng cũ", // Nhãn cho khách hàng cũ
        data: [5, 10, 8, 12, 15, 18, 20], // Dữ liệu số lượng đơn hàng của khách hàng cũ
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Màu cột cho khách hàng cũ (đỏ nhạt)
        borderColor: "rgba(255, 99, 132, 1)", // Màu viền cột cho khách hàng cũ
        borderWidth: 1, // Độ dày viền
      },
      {
        label: "Khách hàng mới", // Nhãn cho khách hàng mới
        data: [5, 10, 10, 10, 10, 12, 15], // Dữ liệu số lượng đơn hàng của khách hàng mới
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Màu cột cho khách hàng mới (xanh nhạt)
        borderColor: "rgba(54, 162, 235, 1)", // Màu viền cột cho khách hàng mới
        borderWidth: 1, // Độ dày viền
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Vị trí hiển thị chú thích
      },
      title: {
        display: true,
        text: "Số lượng đơn hàng theo ngày", // Tiêu đề biểu đồ
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Trục y bắt đầu từ 0
        ticks: {
          callback: function (value) {
            return value + " đơn"; // Hiển thị đơn vị "đơn" trên trục y
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

export default OrdersBarChart;
