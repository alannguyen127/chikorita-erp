import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  const [orders, setOrders] = useState([{ id: 1, name: "Order 1" }]);
  const navigate = useNavigate();
  const addOrder = () => {
    navigate("/order/add_order");
  };
  return (
    <Box component="main">
      <Toolbar />
      <ItemList
        items={orders}
        addItem={addOrder}
        listName={"Orders:"}
        buttonName={"Add Order"}
      />
    </Box>
  );
}

export default OrderPage;
