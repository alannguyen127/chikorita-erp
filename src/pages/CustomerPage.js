import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import ItemList from "../components/ItemList";


// Auto generate customer (Duc Nguyen)
const generateCustomers = (num) => {
  const statuses = ["regular", "vip"];
  const streetNames = ["Main St", "Maple Ave", "Oak Dr", "Pine Rd", "Elm St"];
  const cities = ["Springfield", "Rivertown", "Lakeside", "Greenfield", "Hilltop"];
  const states = ["CA", "NY", "TX", "FL", "IL"];
  const zipCodes = ["90001", "10001", "73301", "33101", "60601"];

  const customers = [];
  
  for (let i = 1; i <= num; i++) {
    const status = statuses[i % 2]; // Alternate between 'regular' and 'vip'
    const street = `${Math.floor(Math.random() * 9999) + 1} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zip = zipCodes[Math.floor(Math.random() * zipCodes.length)];

    customers.push({
      id: i,
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      dob: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/2024`,
      phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`, // Generate random 10-digit phone number
      status: status,
      address: `${street}, ${city}, ${state} ${zip}` // Generate random address
    });
  }

  return customers;
};

//  End Duc Nguyen


function CustomerPage() {
  // Original Huan Nghiem
  // const [customers, setCustomers] = useState([
  //   { id: 1, name: "John Doe", email: "john@example.com" , dob:"1/1/2024",phone:"123456",status:"regular"},
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", dob:"1/1/2024",phone:"123457",status:"vip" },
  // ]);

  const [customers, setCustomers] = useState(generateCustomers(100));



  


  const addCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name: `Customer ${customers.length + 1}`,
      email: `customer${customers.length + 1}@example.com`,
      dob: `customer${customers.length + 1}`,
      phone: `customer${customers.length + 1}`,
      address: `customer${customers.length + 1}`,
      status: `customer${customers.length + 1}`

    };

    setCustomers([...customers, newCustomer]);
  };
  return (
    <Box component="main">
      <Toolbar />
      <ItemList
        items={customers}
        addItem={addCustomer}
        listName={"Customers:"}
        buttonName={"Add Customer"}
      />
    </Box>
  );
}

export default CustomerPage;
