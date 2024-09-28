import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const ItemList = ({ items, addItem, listName, buttonName }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {listName}
      </Typography>
      <Button variant="contained" color="primary" onClick={addItem}>
        {buttonName}
      </Button>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ItemList;
