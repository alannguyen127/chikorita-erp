import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box, Button, TextField, Typography } from "@mui/material";
import { fDate } from "../utils/formatTime";

export default function MyDateRangePicker({ onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  // const [totalDays, setTotalDays] = useState(0);

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newStartDate && newEndDate && newEndDate >= newStartDate) {
      setError("");
    }
  };

  const formatStartDate = startDate ? fDate(startDate) : null;
  const formatEndDate = endDate ? fDate(endDate) : null;

  const handleViewClick = () => {
    const today = new Date();
    if (endDate && startDate && endDate < startDate) {
      setError("End Date cannot be before Start Date.");

      return;
    }
    if (endDate && endDate > today.setHours(0, 0, 0, 0)) {
      setError("End Date cannot be after today");

      return;
    }
    if (onChange && formatStartDate && formatEndDate) {
      // Gửi dữ liệu formatStartDate và formatEndDate ra ngoài thông qua onChange
      onChange(formatStartDate, formatEndDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newDate) => handleDateChange(newDate, endDate)}
          renderInput={(params) => <TextField {...params} />}
          format="dd/MM/yyyy"
        />
        <Box sx={{ mx: 2, mt: 2 }}> - </Box>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newDate) => handleDateChange(startDate, newDate)}
          renderInput={(params) => <TextField {...params} />}
          format="dd/MM/yyyy"
        />
        <Box sx={{ mx: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleViewClick}>
            View
          </Button>
        </Box>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </LocalizationProvider>
  );
}

// if (newStartDate && newEndDate) {
//   const diffDays = dayjs(newEndDate).diff(dayjs(newStartDate), "day");
//   setTotalDays(diffDays);
// } else {
//   setTotalDays(0); // Nếu không chọn đủ cả 2 ngày thì reset lại tổng số ngày
// }
