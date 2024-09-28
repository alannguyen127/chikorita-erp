import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ItemList from "../components/ItemList";

function OrderPage() {
  const [orders, setOrders] = useState([{ id: 1, name: "Order 1" }]);

  const addOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      name: `Order ${orders.length + 1}`,
    };

    setOrders([...orders, newOrder]);
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
