import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          top: "74px",
        },
      }}
    >
      <div />
      <Divider />
      <List>
        <ListItem button to="/" component={RouterLink}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button to="/customer" component={RouterLink}>
          <ListItemText primary="Customer" />
        </ListItem>
        <ListItem button to="/order" component={RouterLink}>
          <ListItemText primary="Order" />
        </ListItem>
        <ListItem button to="/meal_package" component={RouterLink}>
          <ListItemText primary="Meal Package" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
