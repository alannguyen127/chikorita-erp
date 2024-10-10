import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Select,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";
import { useFrappeGetCall } from "frappe-react-sdk";

const CustomerDetailPage = () => {
  const name = useParams();
  if (name) {
    console.log("Param: ", name);
  } else console.log("Param not found");

  const [isEditing, setIsEditing] = useState(false);
  // const [customerDetails, setCustomerDetails] = useState({
  //   nick_name: "JohnDoe",
  //   full_name: "John Doe",
  //   gender: "Male",
  //   phone_number: "0123456789",
  //   address_1: "123 Street",
  //   address_2: "District 1",
  //   address_3: "City",
  //   special_note: "No peanuts",
  //   status: "Active",
  // });

  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customer_detail",
    { name: name.customerId }
  );

  const customerDetail = data?.message.customer_detail;
  console.log("Detail Data from server", customerDetail);
  // Hàm thay đổi trạng thái edit
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Hàm xử lý khi người dùng nhập vào
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setCustomerDetails({ ...customerDetails, [name]: value });
    console.log(name, value);
  };
  if (isLoading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Customer Details</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Nick Name"
          name="nick_name"
          value={customerDetail.nick_name}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Full Name"
          name="full_name"
          value={customerDetail.full_name}
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
            value={customerDetail.gender}
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
          value={customerDetail.phone_number}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 1"
          name="address_1"
          value={customerDetail.address_1}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 2"
          name="address_2"
          value={customerDetail.address_2}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Address 3"
          name="address_3"
          value={customerDetail.address_3}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Special Food Note"
          name="special_note"
          value={customerDetail.special_note}
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
            value={customerDetail.status}
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
