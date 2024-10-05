import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import { customers } from "../test_data/customers";

import { mealPackages } from "../test_data/meal_package";

import { fCurrency } from "../utils/numberFormat";

// Validation schema
const schema = yup.object().shape({
  customerName: yup.string().required("Customer is required"),
  orderDate: yup.date().required("Order date is required"),
  deliveryAddress: yup.string().required("Delivery address is required"),
  paymentStatus: yup.string().required("Payment status is required"),
  shippingFee: yup.number().required("Shipping fee is required"),
  orderNote: yup.string(),
  shippingNote: yup.string(),
});

const AddOrderPage = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      orderMeals: [{ package: "", quantity: 1, unitPrice: 0, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderMeals",
  });

  const [customerAddresses, setCustomerAddresses] = useState([]);
  const selectedCustomer = watch("customerName");
  const orderMeals = watch("orderMeals");
  const shippingFee = watch("shippingFee", 0);

  useEffect(() => {
    // Update delivery address list when customer is selected
    const customer = customers.find((c) => c.name === selectedCustomer);
    setCustomerAddresses(customer ? customer.addresses : []);
    setValue("deliveryAddress", ""); // Clear address when customer changes
  }, [selectedCustomer, setValue]);

  // Calculate total amount
  const calculateTotalAmount = () => {
    const orderTotal = orderMeals.reduce((sum, meal) => sum + meal.price, 0);
    return orderTotal + Number(shippingFee);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        Add New Order
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Name Field */}
        <FormControl fullWidth margin="normal" error={!!errors.customerName}>
          <InputLabel>Customer Name</InputLabel>
          <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.name}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.customerName && (
            <FormHelperText>{errors.customerName.message}</FormHelperText>
          )}
        </FormControl>

        {/* Delivery Address */}
        <FormControl fullWidth margin="normal" error={!!errors.deliveryAddress}>
          <InputLabel>Delivery Address</InputLabel>
          <Controller
            name="deliveryAddress"
            control={control}
            render={({ field }) => (
              <Select {...field} disabled={!customerAddresses.length}>
                {customerAddresses.map((address, index) => (
                  <MenuItem key={index} value={address}>
                    {address}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.deliveryAddress && (
            <FormHelperText>{errors.deliveryAddress.message}</FormHelperText>
          )}
        </FormControl>

        {/* Order Date */}
        <Controller
          name="orderDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Order Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
              error={!!errors.orderDate}
              helperText={errors.orderDate ? errors.orderDate.message : ""}
            />
          )}
        />

        {/* Payment Status */}
        <FormControl fullWidth margin="normal" error={!!errors.paymentStatus}>
          <InputLabel>Payment Status</InputLabel>
          <Controller
            name="paymentStatus"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Not yet">Not yet</MenuItem>
                <MenuItem value="COD">COD</MenuItem>
              </Select>
            )}
          />
          {errors.paymentStatus && (
            <FormHelperText>{errors.paymentStatus.message}</FormHelperText>
          )}
        </FormControl>

        {/* Order Meal Package Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Package</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Controller
                      name={`orderMeals[${index}].package`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) => {
                            const selectedPackage = mealPackages.find(
                              (p) => p.name === e.target.value
                            );
                            setValue(
                              `orderMeals[${index}].package`,
                              selectedPackage.name
                            );
                            setValue(
                              `orderMeals[${index}].unitPrice`,
                              selectedPackage.unitPrice
                            );
                            const quantity = watch(
                              `orderMeals[${index}].quantity`,
                              1
                            );
                            setValue(
                              `orderMeals[${index}].price`,
                              selectedPackage.unitPrice * quantity
                            );
                          }}
                        >
                          {mealPackages.map((pkg) => (
                            <MenuItem key={pkg.id} value={pkg.name}>
                              {pkg.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`orderMeals[${index}].quantity`}
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          fullWidth
                          onChange={(e) => {
                            const quantity = e.target.value;
                            const unitPrice = watch(
                              `orderMeals[${index}].unitPrice`,
                              0
                            );
                            setValue(`orderMeals[${index}].quantity`, quantity);
                            setValue(
                              `orderMeals[${index}].price`,
                              quantity * unitPrice
                            );
                          }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`orderMeals[${index}].unitPrice`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          value={fCurrency(field.value)}
                          fullWidth
                          disabled
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      name={`orderMeals[${index}].price`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          value={fCurrency(field.value)}
                          fullWidth
                          disabled
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => remove(index)}
                      variant="outlined"
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={() =>
            append({ package: "", quantity: 1, unitPrice: 0, price: 0 })
          }
        >
          Add Package
        </Button>

        {/* Shipping Fee */}
        <Controller
          name="shippingFee"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="Shipping Fee"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.shippingFee}
              helperText={errors.shippingFee ? errors.shippingFee.message : ""}
            />
          )}
        />

        {/* Total Amount */}
        <TextField
          label="Total Amount"
          type="text"
          value={fCurrency(calculateTotalAmount())}
          fullWidth
          margin="normal"
          disabled
        />

        {/* Order Note */}
        <Controller
          name="orderNote"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Order Note"
              fullWidth
              margin="normal"
            />
          )}
        />

        {/* Shipping Note */}
        <Controller
          name="shippingNote"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Shipping Note"
              fullWidth
              margin="normal"
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default AddOrderPage;
