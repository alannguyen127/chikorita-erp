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
import { useFrappeGetCall } from "frappe-react-sdk";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueBarChart = ({ dateRange, startDate, endDate }) => {
  const { data } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.order.order.get_sales_data_by_date",
    {
      start_date: startDate,
      end_date: endDate,
    },
    {
      enabled: !!startDate && !!endDate,
    }
  );

  // console.log("sale data", salesData);
  const salesData = data?.message.sales_data || [];

  const totalSalesPerDay = dateRange.map((date) => {
    const salesOnDate = salesData.find((sale) => sale.order_date === date);
    return salesOnDate ? salesOnDate.total_sales : 0;
  });

  const revenueData = {
    labels: dateRange.length > 0 ? dateRange : [],
    datasets: [
      {
        label: "Doanh thu",
        data: totalSalesPerDay,
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
            return dateRange.length > 0 ? fCurrency(value) : 0;
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
      <Bar data={revenueData} options={options} />
    </Box>
  );
};

export default RevenueBarChart;
