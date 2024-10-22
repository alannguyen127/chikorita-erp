import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled } from "@mui/material/styles";
import { useFrappeGetCall } from "frappe-react-sdk";
import LoadingScreen from "./LoadingScreen";

const CustomCard = styled(Card)(({ theme }) => ({
  border: "2px solid #ccc",
  borderRadius: 15,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  minHeight: "200px",
  display: "flex",
  alignItems: "flex-start",
}));

const Dashboard = ({ startDate, endDate }) => {
  const { data: totalOrderData, isLoading: totalOrderDataLoading } =
    useFrappeGetCall(
      "emfresh_erp.em_fresh_erp.api.order.order.get_total_order_data_by_date",
      {
        start_date: startDate,
        end_date: endDate,
      }
      // {
      //   enabled: !!startDate && !!endDate,
      // }
    );

  const totalOrder = totalOrderData?.message.total_order_data[0];

  const { data: revenueData, isLoading: revenueDataLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.order.order.get_revenue_week_and_month"
  );

  const revenue = revenueData?.message;
  console.log(revenue);

  const {
    data: statusData,
    error: statusError,
    isLoading: statusLoading,
  } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customer_status_data",
    {}
  );

  if (statusLoading || totalOrderDataLoading || revenueDataLoading) {
    return <LoadingScreen />;
  }

  if (statusError) {
    return JSON.stringify(statusError);
  }
  const customerStatusData = statusData?.message;
  // console.log(customerStatusData);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="flex-start"
      alignItems="stretch"
      marginTop="20px"
    >
      {/* Khung tổng số khách hàng */}
      <Grid item xs={12} sm={4}>
        <CustomCard
          variant="outlined"
          style={{ backgroundColor: "#f9f9f9", height: "100%" }}
        >
          <CardContent>
            <Grid container alignItems="flex-start">
              <Grid item xs={3}>
                <PersonIcon
                  fontSize="large"
                  style={{ color: "#3f51b5", marginRight: "5px" }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" gutterBottom>
                  Tổng số khách hàng
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {customerStatusData.total_customers}
                </Typography>
                <Typography color="textSecondary">Trong đó:</Typography>
                <Typography color="textSecondary">
                  - Active: {customerStatusData.total_active_customers}
                </Typography>
                <Typography color="textSecondary">
                  - Inactive: {customerStatusData.total_inactive_customers}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      {/* Khung tổng số order theo payment status */}
      <Grid item xs={12} sm={4}>
        <CustomCard
          variant="outlined"
          style={{ backgroundColor: "#f1f8e9", height: "100%" }}
        >
          <CardContent>
            <Grid container alignItems="flex-start">
              <Grid item xs={3}>
                <ShoppingCartIcon
                  fontSize="large"
                  style={{ color: "#43a047", marginRight: "8px" }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" gutterBottom>
                  Tổng số Đơn đặt hàng
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {totalOrder ? totalOrder.total_orders : 0}
                </Typography>
                <Typography color="textSecondary">Trong đó:</Typography>
                <Typography color="textSecondary">
                  - Thanh toán COD: {totalOrder ? totalOrder.cod_orders : 0}
                </Typography>
                <Typography color="textSecondary">
                  - Đã thanh toán: {totalOrder ? totalOrder.paid_orders : 0}
                </Typography>
                <Typography color="textSecondary">
                  - Chưa thanh toán:{" "}
                  {totalOrder ? totalOrder.not_yet_orders : 0}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      {/* Khung doanh thu tuần và tháng */}
      <Grid item xs={12} sm={4}>
        <CustomCard
          variant="outlined"
          style={{ backgroundColor: "#e8f4fd", height: "100%" }}
        >
          <CardContent>
            <Grid container alignItems="flex-start">
              <Grid item xs={3}>
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#0277bd" }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Doanh thu
                </Typography>
                <Typography color="textSecondary">
                  Tuần này: {revenue.revenue_week.toLocaleString()} VND
                </Typography>
                <Typography color="textSecondary">
                  Tháng này: {revenue.revenue_month.toLocaleString()} VND
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
