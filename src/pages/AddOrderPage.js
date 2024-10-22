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
  Autocomplete,
} from "@mui/material";
import { fCurrency } from "../utils/numberFormat";
import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  customerName: yup.string().required("Customer is required"),
  orderDate: yup.date().required("Order date is required"),
  deliveryAddress: yup.string().required("Delivery address is required"),
  paymentStatus: yup.string().required("Payment status is required"),
  orderStatus: yup.string().required("Order status is required"),
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
      orderMeals: [{ package: "", quantity: 0, unitPrice: 0, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderMeals",
  });

  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const selectedCustomer = watch("customerName");
  const orderMeals = watch("orderMeals");
  const shippingFee = watch("shippingFee", 0);
  const navigate = useNavigate();

  // Call to get customers from EFE Customer Doctype
  const { data: customers, error: customerError } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.customer.customer.get_customers"
  );

  // console.log(customers);
  const customersData = customers?.message.customers;

  // Call to get meal packages from EFE Meal Package Doctype
  const { data: mealPackagesData, error: mealPackageError } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.meal_package.meal_package.get_meals"
  );
  const meals = mealPackagesData?.message.meals;
  // console.log(meals);

  useEffect(() => {
    // Update delivery address list when customer is selected
    if (customersData && selectedCustomer) {
      const customer = customersData.find(
        (c) => c.nick_name === selectedCustomer
      );
      if (customer) {
        setCustomerId(customer.name);
        setPhoneNumber(customer.phone_number);
        setValue("customerId", customerId);
        setValue("phoneNumber", phoneNumber);
        setCustomerAddresses(
          customer
            ? [
                customer.address_1,
                customer.address_2,
                customer.address_3,
              ].filter((address) => address !== null)
            : []
        );
      } else {
        setCustomerId("");
        setPhoneNumber("");
        setCustomerAddresses([]);
      }

      setValue("deliveryAddress", ""); // Clear address when customer changes
    }
  }, [
    selectedCustomer,
    setValue,
    customersData,
    customers,
    customerId,
    phoneNumber,
  ]);

  // Calculate total amount
  const calculateTotalAmount = () => {
    const orderTotal = orderMeals.reduce((sum, meal) => sum + meal.price, 0);
    return orderTotal + Number(shippingFee);
  };

  const {
    call,
    loading: creatingOrder,
    error: createOrderError,
  } = useFrappePostCall(
    "emfresh_erp.em_fresh_erp.api.order.order.create_order"
  );

  const onSubmit = async (data) => {
    const payload = {
      customerName: data.customerId,
      orderDate: data.orderDate
        ? new Date(data.orderDate).toISOString().replace("T", " ").split(".")[0]
        : "",
      deliveryAddress: data.deliveryAddress,
      orderStatus: data.orderStatus,
      paymentStatus: data.paymentStatus,
      shippingFee: data.shippingFee,
      orderNote: data.orderNote,
      shippingNote: data.shippingNote,
      orderMeals: data.orderMeals.map((meal) => ({
        package: meal.name,
        packageId: meal.id,
        quantity: meal.quantity,
      })),
    };
    console.log(payload);
    try {
      const response = await call({ data: payload });
      if (response.message.status === "success") {
        console.log("Create order successfully!");
        alert("Create order successfully!");
        navigate("/order");
      } else {
        console.log(
          "Status: ",
          response.message.status,
          ":",
          response.message.message
        );
      }
    } catch (err) {
      console.error("Error creating order", err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        New Order
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Name Field */}
        <FormControl fullWidth margin="normal" error={!!errors.customerName}>
          <InputLabel>Customer Name</InputLabel>
          <Controller
            name="customerName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field}>
                {customersData &&
                  customersData.map((customer) => (
                    <MenuItem key={customer.id} value={customer.nick_name}>
                      {customer.nick_name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          {/* <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                freeSolo
                options={
                  customersData
                    ? customersData.map((customer) => customer.nick_name)
                    : []
                }
                onInputChange={(event, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer Name"
                    fullWidth
                    error={!!errors.customerName}
                    helperText={
                      errors.customerName ? errors.customerName.message : ""
                    }
                  />
                )}
              />
            )}
          /> */}
          {errors.customerName && (
            <FormHelperText>{errors.customerName.message}</FormHelperText>
          )}
        </FormControl>
        <Controller
          name="customerId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer ID"
              fullWidth
              margin="normal"
              disabled
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              margin="normal"
              disabled
            />
          )}
        />

        {/* Delivery Address */}
        <FormControl fullWidth margin="normal" error={!!errors.deliveryAddress}>
          <InputLabel>Delivery Address</InputLabel>
          <Controller
            name="deliveryAddress"
            control={control}
            defaultValue=""
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
              // slotProps={{ input: { shrink: true } }}
              fullWidth
              focused
              margin="normal"
              error={!!errors.orderDate}
              helperText={errors.orderDate ? errors.orderDate.message : ""}
            />
          )}
        />

        <FormControl fullWidth margin="normal" error={!!errors.orderStatus}>
          <InputLabel>Order Status</InputLabel>
          <Controller
            name="orderStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="Ordered">Ordered</MenuItem>
                <MenuItem value="Postpone">Postpone</MenuItem>
                <MenuItem value="Success">Success</MenuItem>
                <MenuItem value="Cancel">Cancel</MenuItem>
              </Select>
            )}
          />
          {errors.paymentStatus && (
            <FormHelperText>{errors.paymentStatus.message}</FormHelperText>
          )}
        </FormControl>

        {/* Payment Status */}
        <FormControl fullWidth margin="normal" error={!!errors.paymentStatus}>
          <InputLabel>Payment Status</InputLabel>
          <Controller
            name="paymentStatus"
            control={control}
            defaultValue=""
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
        <TableContainer
          component={Paper}
          sx={{
            m: "18px 0",
            borderRadius: "8px",
            // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Package
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Unit Price
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  Price
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell sx={{ padding: "12px" }}>
                    <Controller
                      name={`orderMeals[${index}].name`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          onChange={(e) => {
                            const selectedPackage = meals.find(
                              (p) => p.title === e.target.value
                            );

                            setValue(
                              `orderMeals[${index}].name`,
                              selectedPackage.title
                            );
                            setValue(
                              `orderMeals[${index}].id`,
                              selectedPackage.name
                            );

                            setValue(
                              `orderMeals[${index}].unitPrice`,
                              selectedPackage.unit_price
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
                          {meals &&
                            meals.map((pkg) => (
                              <MenuItem key={pkg.id} value={pkg.title}>
                                {pkg.title}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "12px" }}>
                    <Controller
                      name={`orderMeals[${index}].quantity`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          fullWidth
                          onChange={(e) => {
                            const quantity = parseInt(e.target.value);
                            if (quantity >= 0) {
                              const unitPrice = watch(
                                `orderMeals[${index}].unitPrice`,
                                0
                              );
                              setValue(
                                `orderMeals[${index}].quantity`,
                                quantity
                              );
                              setValue(
                                `orderMeals[${index}].price`,
                                quantity * unitPrice
                              );
                            }
                          }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "12px" }}>
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
                  <TableCell sx={{ padding: "12px" }}>
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
                  <TableCell sx={{ padding: "12px", textAlign: "center" }}>
                    <Button
                      onClick={() => remove(index)}
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ minWidth: "80px" }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            sx={{ m: "13px" }}
            variant="outlined"
            color="info"
            onClick={() =>
              append({ package: "", quantity: 0, unitPrice: 0, price: 0 })
            }
          >
            Add Package
          </Button>
        </TableContainer>

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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={creatingOrder}
        >
          {creatingOrder ? "Submitting..." : "Save"}
        </Button>
      </form>
      {createOrderError && (
        <p style={{ color: "red" }}>Error: {createOrderError.message}</p>
      )}
    </Container>
  );
};

export default AddOrderPage;
