import React from "react";
import { Button, Typography } from "@mui/material";
import Table, { SelectColumnFilter, StatusPill } from "./Table";
import { useNavigate } from "react-router-dom";

const OrderList = ({ items, addItem, listName, buttonName }) => {
  // Function to return the items
  const getData = () => items;

  const navigate = useNavigate();

  // Table columns definition
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "name",
      },
      {
        Header: "Customer Name",
        accessor: "customer_full_name",
      },
      {
        Header: "Order Date",
        accessor: "order_date",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Payment Status",
        accessor: "payment_status",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Total Amount",
        accessor: "total_amount",
      },
      {
        Header: "Order Note",
        accessor: "order_note",
      },
    ],
    []
  );

  // Memoized data
  const data = React.useMemo(() => getData(), [items]);

  const handleRowClick = (orderId) => {
    navigate(`/order/:${orderId}`);
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

export default OrderList;
