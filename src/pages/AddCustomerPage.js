import React from "react";
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
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be numeric"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Status is required"),
});

const AddCustomerPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to backend)
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.fullName}
              helperText={errors.fullName ? errors.fullName.message : ""}
            />
          )}
        />

        {/* Phone Number Field */}
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
            />
          )}
        />

        {/* Gender Field */}
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
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          />
          {errors.gender && (
            <FormHelperText>{errors.gender.message}</FormHelperText>
          )}
        </FormControl>

        {/* Status Field */}
        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Status">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <FormHelperText>{errors.status.message}</FormHelperText>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Customer
        </Button>
      </form>
    </Container>
  );
};

export default AddCustomerPage;
