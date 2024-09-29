import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Table,{SelectColumnFilter, StatusPill} from './Table'

const ItemList = ({ items, addItem, listName, buttonName }) => {
  // Function to return the items
  const getData = () => items;

  // Table columns definition
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
        
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Dob",
        accessor: "dob",
        
      },
      {
        Header: "Address",
        accessor: "address",
        
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,  
        filter: 'includes', 
        Cell: StatusPill,
      }
      
    ],
    []
  );

  // Memoized data
  const data = React.useMemo(() => getData(), [items]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {listName}
      </Typography>
      <Button variant="contained" color="primary" onClick={addItem}>
        {buttonName}
      </Button>
      {/* <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List> */}

      <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-4 ">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
    </div>
  );
};

export default ItemList;
