import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled } from "@mui/material/styles";
import { useFrappeGetCall } from "frappe-react-sdk";
import LoadingScreen from "./LoadingScreen";

const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: 15, // Bo tròn góc
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Shadow hiệu ứng nổi
  transition: "transform 0.2s", // Hiệu ứng khi hover
  "&:hover": {
    transform: "scale(1.05)", // Phóng to khi hover
  },
  minHeight: "200px", // Chiều cao tối thiểu của card
  display: "flex", // Đảm bảo nội dung căn giữa theo chiều dọc
  justifyContent: "center",
  alignItems: "center",
}));

const Dashboard = () => {
  const [customers, setCustomers] = useState({
    total: 150,
    active: 120,
    inactive: 30,
  });

  const [orders, setOrders] = useState({
    total: 200,
    cod: 70,
    paid: 100,
    notYet: 30,
  });

  const [revenue, setRevenue] = useState({
    weekly: 7000000, // Doanh thu tuần
    monthly: 30000000, // Doanh thu tháng
  });

  const {
    data: statusData,
    error: statusError,
    isLoading: statusLoading,
  } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customer_status_data",
    {}
  );

  if (statusLoading) {
    return <LoadingScreen />;
  }

  const customerStatusData = statusData?.message;
  console.log(customerStatusData);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="flex-start"
      alignItems="stretch"
      margin="20px 0 0 30px"
    >
      {/* Khung tổng số khách hàng */}
      <Grid item xs={12} sm={4}>
        <CustomCard
          variant="outlined"
          style={{ backgroundColor: "#f9f9f9", height: "100%" }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <PersonIcon
                  fontSize="large"
                  style={{ color: "#3f51b5", margin: "5px" }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" gutterBottom>
                  Total Customers
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {customerStatusData.total_customers}
                </Typography>
                <Typography color="textSecondary">
                  Active: {customerStatusData.total_active_customers}
                </Typography>
                <Typography color="textSecondary">
                  Inactive: {customerStatusData.total_inactive_customers}
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
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <ShoppingCartIcon
                  fontSize="large"
                  style={{ color: "#43a047", margin: "8px" }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" gutterBottom>
                  Total Orders
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {orders.total}
                </Typography>
                <Typography color="textSecondary">COD: {orders.cod}</Typography>
                <Typography color="textSecondary">
                  Paid: {orders.paid}
                </Typography>
                <Typography color="textSecondary">
                  Not Yet: {orders.notYet}
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
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <AttachMoneyIcon
                  fontSize="large"
                  style={{ color: "#0277bd" }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" gutterBottom>
                  Revenue
                </Typography>
                <Typography color="textSecondary">
                  Weekly: {revenue.weekly.toLocaleString()} VND
                </Typography>
                <Typography color="textSecondary">
                  Monthly: {revenue.monthly.toLocaleString()} VND
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
