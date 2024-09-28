import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ItemList from "../components/ItemList";

function CustomerPage() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const addCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name: `Customer ${customers.length + 1}`,
      email: `customer${customers.length + 1}@example.com`,
    };

    setCustomers([...customers, newCustomer]);
  };
  return (
    <Box component="main">
      <Toolbar />
      <ItemList
        items={customers}
        addItem={addCustomer}
        listName={"Customer"}
        buttonName={"Add Customer"}
      />
    </Box>
  );
}

export default CustomerPage;
