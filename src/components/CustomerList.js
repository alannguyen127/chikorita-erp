import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Table, { SelectColumnFilter, StatusPill } from "./Table";

const CustomerList = ({ items, addItem, listName, buttonName }) => {
  // Function to return the items
  const getData = () => items;
  const navigate = useNavigate();
  // Table columns definition
  const columns = React.useMemo(
    () => [
      // {
      //   Header: "Id",
      //   accessor: "name",
      // },
      {
        Header: "Nick Name",
        accessor: "nick_name",
      },
      {
        Header: "Full Name",
        accessor: "full_name",
      },
      {
        Header: "Phone",
        accessor: "phone_number",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Main Address",
        accessor: "address_1",
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
  const handleRowClick = (customerId) => {
    navigate(`/customer/${customerId}`);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" gutterBottom>
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
      </div>

      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-4 ">
            <Table columns={columns} data={data} onRowClick={handleRowClick} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerList;
