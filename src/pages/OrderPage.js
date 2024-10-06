import { Box } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

import OrderList from "../components/OrderList";

function OrderPage() {
  const orders = [{ id: 1, name: "Order 1" }];
  const navigate = useNavigate();
  const addOrder = () => {
    navigate("/order/add_order");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <OrderList
        items={orders}
        addItem={addOrder}
        listName={"Orders:"}
        buttonName={"Add Order"}
      />
    </Box>
  );
}

export default OrderPage;
