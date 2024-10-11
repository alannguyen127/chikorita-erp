import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function MyDateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0);

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    if (newStartDate && newEndDate) {
      const diffDays = dayjs(newEndDate).diff(dayjs(newStartDate), "day");
      setTotalDays(diffDays);
    } else {
      setTotalDays(0); // Nếu không chọn đủ cả 2 ngày thì reset lại tổng số ngày
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newDate) => handleDateChange(newDate, endDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box sx={{ mx: 2, mt: 2 }}> - </Box>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newDate) => handleDateChange(startDate, newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        {/* <Typography variant="h6" sx={{ mt: 2 }}>
          Total Days: {totalDays}
        </Typography> */}
      </Box>
    </LocalizationProvider>
  );
}
