import React from "react";
import { useFrappePostCall } from "frappe-react-sdk";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormLabel,
  FormHelperText,
  Container,
  Typography,
} from "@mui/material";

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

const AddCustomerPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    call,
    loading: submitting,
    error: submitError,
  } = useFrappePostCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.create_customer"
  );

  const onSubmit = async (data) => {
    try {
      const response = await call(data);
      console.log(response);
      if (response.message.status === "success") {
        alert("Customer created successfully");
        reset();
      } else {
        alert(`Error: ${JSON.stringify(response.message)}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nick_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nick Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.nick_name}
              helperText={errors.nick_name ? errors.nick_name.message : ""}
            />
          )}
        />
        <Controller
          name="full_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.full_name}
              helperText={errors.full_name ? errors.full_name.message : ""}
            />
          )}
        />

        <Controller
          name="phone_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.phone_number}
              helperText={
                errors.phone_number ? errors.phone_number.message : ""
              }
            />
          )}
        />

        <Controller
          name="address_1"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Main Address"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.address_1}
              helperText={errors.address_1 ? errors.address_1.message : ""}
            />
          )}
        />
        <Controller
          name="address_2"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address 2"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.address_2}
              helperText={errors.address_2 ? errors.address_2.message : ""}
            />
          )}
        />
        <Controller
          name="address_3"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address 3"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.address_3}
              helperText={errors.address_3 ? errors.address_3.message : ""}
            />
          )}
        />

        <FormControl
          component="fieldset"
          margin="normal"
          error={!!errors.gender}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="No info"
                  control={<Radio />}
                  label="No Info"
                />
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <FormHelperText>{errors.gender.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <FormHelperText>{errors.status.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Customer"}
        </Button>
      </form>
      {submitError && <p>Error: {submitError}</p>}
    </Container>
  );
};

export default AddCustomerPage;
