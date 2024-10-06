import React from "react";
import { Button, Typography } from "@mui/material";
import Table, { SelectColumnFilter, StatusPill } from "./Table";

const CustomerList = ({ items, addItem, listName, buttonName }) => {
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
        filter: "includes",
        Cell: StatusPill,
      },
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: "20px" }}
        onClick={addItem}
      >
        {buttonName}
      </Button>

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

export default CustomerList;
