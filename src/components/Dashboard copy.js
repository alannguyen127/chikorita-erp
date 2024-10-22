import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const Dashboard = () => {
  // State cho tổng số khách hàng và chi tiết
  const [customers, setCustomers] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  // State cho số lượng order theo tình trạng thanh toán
  const [orders, setOrders] = useState({
    total: 0,
    COD: 0,
    Paid: 0,
    NotYet: 0,
  });
  // State cho doanh thu
  const [revenue, setRevenue] = useState({ week: 0, month: 0 });

  // Giả lập dữ liệu fetch từ API
  useEffect(() => {
    // Ví dụ dữ liệu giả
    const fetchData = async () => {
      // Khách hàng
      setCustomers({ total: 200, active: 150, inactive: 50 });
      // Đơn hàng
      setOrders({ total: 100, COD: 40, Paid: 50, NotYet: 10 });
      // Doanh thu
      setRevenue({ week: 7000000, month: 30000000 });
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Tổng số khách hàng */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Tổng số khách hàng</Typography>
            <Typography variant="h4">{customers.total}</Typography>
            <Typography variant="body1">Active: {customers.active}</Typography>
            <Typography variant="body1">
              Inactive: {customers.inactive}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Tổng số đơn hàng theo tình trạng thanh toán */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Tổng số đơn hàng</Typography>
            <Typography variant="h4">{orders.total}</Typography>
            <Typography variant="body1">COD: {orders.COD}</Typography>
            <Typography variant="body1">Paid: {orders.Paid}</Typography>
            <Typography variant="body1">Not Yet: {orders.NotYet}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Doanh thu tuần và tháng */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">Doanh thu</Typography>
            <Typography variant="body1">
              Tuần: {revenue.week.toLocaleString()} VND
            </Typography>
            <Typography variant="body1">
              Tháng: {revenue.month.toLocaleString()} VND
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
