import { Box } from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

import { useFrappeGetCall } from "frappe-react-sdk";

import OrderList from "../components/OrderList";

function OrderPage() {
  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.order.order.get_orders",
    {}
  );

  const orders = data?.message.orders;
  const navigate = useNavigate();

  const addOrder = () => {
    navigate("/order/add_order");
  };
  if (isLoading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <OrderList
        items={orders}
        addItem={addOrder}
        listName={"Orders"}
        buttonName={"Add Order"}
      />
    </Box>
  );
}

export default OrderPage;
