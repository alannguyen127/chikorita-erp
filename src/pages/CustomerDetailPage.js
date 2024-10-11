import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFrappeGetCall, useFrappePutCall } from "frappe-react-sdk";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingScreen from "../components/LoadingScreen";

// Validation schema using Yup
const schema = yup.object().shape({
  nick_name: yup
    .string()
    .required("Nick name is required")
    .min(2, "Nick name must be at least 2 characters"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Status is required"),
  address_1: yup.string().required("Address is required"),
});

const CustomerDetailPage = () => {
  const customerId = useParams();
  // if (customerId) {
  //   console.log("Param: ", customerId);
  // } else console.log("Param not found");

  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customer_detail",
    { customer_id: customerId.customerId }
  );

  const {
    call: updateCustomer,
    loading,
    isCompleted,
    reset: FPreset,
  } = useFrappePutCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.update_customer"
  );

  const customerDetail = data?.message.customer_detail;
  // console.log("Detail Data from server", customerDetail);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(customerDetail);
  }, [JSON.stringify(customerDetail), reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateCustomer({
        customer_id: customerId.customerId,
        ...data,
      });
      console.log("Customer updated status:", response);
      alert("Customer updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Typography variant="h5">Customer Details</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (isEditing) {
              handleSubmit(onSubmit)();
            } else {
              handleEditClick();
            }
          }}
          type={isEditing ? "button" : "submit"}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} style={{ padding: 20 }}>
          <Grid size={6}>
            <TextField
              label="Nick Name"
              {...register("nick_name", { required: "Nick Name is required" })}
              fullWidth
              error={!!errors.nick_name}
              helperText={errors.nick_name?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Full Name"
              {...register("full_name")}
              fullWidth
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Gender</InputLabel>
              <Select
                {...register("gender", { required: "Gender is required" })}
                defaultValue={customerDetail.gender || ""}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="No info">No Info</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <TextField
              label="Phone Number"
              {...register("phone_number", {
                required: "Phone Number is required",
              })}
              fullWidth
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Main Address"
              {...register("address_1", {
                required: "Address 1 is required",
              })}
              fullWidth
              error={!!errors.address_1}
              helperText={errors.address_1?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Address 2"
              {...register("address_2")}
              fullWidth
              error={!!errors.address_2}
              helperText={errors.address_2?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Address 3"
              {...register("address_3")}
              fullWidth
              error={!!errors.address_3}
              helperText={errors.address_3?.message}
              disabled={!isEditing}
            />
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Status</InputLabel>
              <Select
                {...register("status", { required: "Status is required" })}
                defaultValue={customerDetail.status || ""}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid size={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (isEditing) {
                  handleSubmit(onSubmit)();
                } else {
                  handleEditClick();
                }
              }}
              type={isEditing ? "button" : "submit"}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </>
  );
};

export default CustomerDetailPage;
