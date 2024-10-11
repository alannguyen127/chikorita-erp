import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";

import { useFrappeGetCall } from "frappe-react-sdk";
import LoadingScreen from "../LoadingScreen";
// Đăng ký các thành phần cần thiết
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderPieChart = () => {
  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customer_gender_data",
    {}
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  const genderData = data?.message;

  console.log("gender Data", genderData);

  const chartData = {
    labels: ["Nam", "Nữ", "Không có thông tin"],
    datasets: [
      {
        label: "Giới tính khách hàng",
        data: [
          genderData.male_customers,
          genderData.female_customers,
          genderData.no_info_customers,
        ], // Số lượng khách hàng: Nam, Nữ và Không có thông tin
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
            const value = tooltipItem.raw;
            return `${label}: ${value} khách hàng`;
          },
        },
      },
    },
  };

  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

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
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default GenderPieChart;
