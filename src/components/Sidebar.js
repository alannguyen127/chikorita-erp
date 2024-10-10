import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard"); // Tab mặc định là "Dashboard"
  const navigate = useNavigate();
  const tabs = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/" },
    { text: "Customer", icon: <PeopleIcon />, link: "/customer" },
    { text: "Order", icon: <ReceiptIcon />, link: "/order" },
    {
      text: "Meal Package",
      icon: <RestaurantMenuIcon />,
      link: "/meal_package",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: {
          width: 240,
          backgroundColor: "#f4f4f4",
          boxSizing: "border-box",
          top: "65px",
        },
      }}
    >
      <Divider />
      <List>
        {tabs.map((tab, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              setSelectedTab(tab.text);
              navigate(tab.link);
            }}
            selected={selectedTab === tab.text}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
