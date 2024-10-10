import React from "react";
import { Button, Typography } from "@mui/material";
import Table, { SelectColumnFilter, StatusPill } from "./Table";

const MealPkgList = ({ items, addItem, listName, buttonName }) => {
  // Function to return the items
  const getData = () => items;

  // Table columns definition
  const columns = React.useMemo(
    () => [
      // {
      //   Header: "ID",
      //   accessor: "name",
      // },
      {
        Header: "Package Name",
        accessor: "title",
      },
      {
        Header: "Short Name",
        accessor: "short_title",
      },
      {
        Header: "Size",
        accessor: "size",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Duration",
        accessor: "duration",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Meals Per Day",
        accessor: "meals_per_day",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: StatusPill,
      },
      {
        Header: "Unit Price",
        accessor: "unit_price",
      },
    ],
    []
  );

  // Memoized data
  const data = React.useMemo(() => getData(), [items]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {listName}
      </Typography>

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

export default MealPkgList;
