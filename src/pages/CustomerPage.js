import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../components/CustomerList";

import { useFrappeGetCall } from "frappe-react-sdk";
// import { Curtains } from "@mui/icons-material";

function CustomerPage() {
  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customers",
    {}
  );

  const customers = data?.message.customers;
  const navigate = useNavigate();

  const addCustomer = () => {
    navigate("/customer/add_customer");
  };

  if (isLoading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Box component="main">
      <CustomerList
        items={customers}
        addItem={addCustomer}
        listName={"Customers:"}
        buttonName={"Add Customer"}
      />
    </Box>
  );
}

export default CustomerPage;
