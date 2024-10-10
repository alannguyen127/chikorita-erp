import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const CustomerDetailPage = () => {
  // Khởi tạo state cho từng field
  const [isEditing, setIsEditing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    nick_name: "JohnDoe",
    full_name: "John Doe",
    gender: "Male",
    phone_number: "0123456789",
    address_1: "123 Street",
    address_2: "District 1",
    address_3: "City",
    special_note: "No peanuts",
    status: "Active",
  });

  // Hàm thay đổi trạng thái edit
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Hàm xử lý khi người dùng nhập vào
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Customer Details</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Nick Name"
          name="nick_name"
          value={customerDetails.nick_name}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Full Name"
          name="full_name"
          value={customerDetails.full_name}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth disabled={!isEditing}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={customerDetails.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="No Info">No Info</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Phone Number"
          name="phone_number"
          value={customerDetails.phone_number}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 1"
          name="address_1"
          value={customerDetails.address_1}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 2"
          name="address_2"
          value={customerDetails.address_2}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 3"
          name="address_3"
          value={customerDetails.address_3}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Special Food Note"
          name="special_note"
          value={customerDetails.special_note}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth disabled={!isEditing}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={customerDetails.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomerDetailPage;
