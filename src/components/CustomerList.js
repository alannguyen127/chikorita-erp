import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const CustomerList = ({ customers, addCustomer }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>
      <Button variant="contained" color="primary" onClick={addCustomer}>
        Add Customer
      </Button>
      <List>
        {customers.map((customer) => (
          <ListItem key={customer.id}>
            <ListItemText primary={customer.name} secondary={customer.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CustomerList;
