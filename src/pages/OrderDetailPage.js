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

import { fCurrency } from "../utils/numberFormat";
import { useFrappeDeleteCall, useFrappeGetCall } from "frappe-react-sdk";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

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

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const orderId = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.order.order.get_order_detail",
    { order_id: orderId.orderID }
  );

  const orderDetail = data?.message?.order_detail;
  // const orderMealPackage = orderDetail?.order_meal_package;

  console.log(orderDetail);
  // console.log(orderMealPackage[0]);
  // } else {
  //   if (isLoading) {
  //     console.log("Loading data...");
  //   }
  //   if (error) {
  //     console.error("Error fetching order details:", error);
  //   }
  // }

  const {
    call: deleteOrder,
    isLoading: isDeleting,
    error: deleteOrderError,
  } = useFrappeDeleteCall(
    "emfresh_erp.em_fresh_erp.api.order.order.delete_order"
  );

  // Call to get meal packages from EFE Meal Package Doctype
  const { data: mealPackagesData, error: mealPackageError } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.meal_package.meal_package.get_meals"
  );
  const meals = mealPackagesData?.message.meals;
  // console.log(meals);
  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      orderMeals: [{ package: "", quantity: 1, unitPrice: 0, price: 0 }],
    },
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderMeals",
  });

  useEffect(() => {
    reset(orderDetail);
  }, [orderDetail, reset]);

  // const [customerAddresses, setCustomerAddresses] = useState([]);
  // const selectedCustomer = watch("customerName");
  // const orderMeals = watch("orderMeals");
  // const shippingFee = watch("shippingFee", 0);

  // useEffect(() => {
  //   // Update delivery address list when customer is selected
  //   const customer = customers.find((c) => c.name === selectedCustomer);
  //   setCustomerAddresses(customer ? customer.addresses : []);
  //   setValue("deliveryAddress", ""); // Clear address when customer changes
  // }, [selectedCustomer, setValue]);

  // Calculate total amount
  // const calculateTotalAmount = () => {
  //   const orderTotal = orderMeals.reduce((sum, meal) => sum + meal.price, 0);
  //   return orderTotal + Number(shippingFee);
  // };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  // const handleDeleteClick = async () => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this customer?"
  //   );
  //   if (confirmed) {
  //     try {
  //       const response = await deleteCustomer({
  //         customer_id: customerId.customerId,
  //       });
  //       // console.log("Delele customer status:", response.message.status);
  //       if (response.message.status === "success") {
  //         alert(response.message.message);
  //         navigate("/customer");
  //       }
  //     } catch (error) {
  //       console.error("Delete failed", error);
  //       alert("Failed to delete customer.");
  //     }
  //   }
  // };
  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      try {
        const response = await deleteOrder({
          order_id: orderId.orderID,
        });
        // console.log("Delele customer status:", response.message.status);
        if (response.message.status === "success") {
          alert(response.message.message);
          navigate("/order");
        }
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete order.");
      }
    }
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <Typography variant="h5">Order ID: {orderDetail.name}</Typography>
        <div>
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
            sx={{ margin: "0 15px" }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isDeleting || isEditing === true}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Name Field */}
        <TextField
          label="Customer Full Name"
          {...register("customer_full_name")}
          fullWidth
          error={!!errors.customer_full_name}
          helperText={errors.customer_full_name?.message}
          disabled
        />
        <Controller
          name="customer_nick_name"
          control={control}
          disabled
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer ID"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="phone_number"
          control={control}
          disabled
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              {...register("phone_number", {
                required: "Phone Number is required",
              })}
              fullWidth
              margin="normal"
            />
          )}
        />
        <TextField
          label="Order Date"
          {...register("order_date")}
          fullWidth
          error={!!errors.orderDate}
          helperText={errors.orderDate?.message}
          disabled
        />
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.orderStatus}
          disabled={!isEditing}
        >
          <InputLabel>Order Status</InputLabel>
          <Controller
            name="order_status"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={orderDetail.order_status || ""}>
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
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.paymentStatus}
          disabled={!isEditing}
        >
          <InputLabel>Payment Status</InputLabel>
          <Controller
            name="payment_status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                defaultValue={orderDetail.payment_status || ""}
              >
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

        {/* Meal Package Table */}

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
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell sx={{ padding: "12px" }}>
                    <Controller
                      name={`orderDetail.order_meal_package[${index}].meal_package`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select {...field} fullWidth>
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
                      name={`orderDetail.order_meal_package[${index}].quantity`}
                      control={control}
                      render={({ field }) => (
                        <TextField {...field} type="number" fullWidth />
                      )}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: "12px" }}>
                    <Controller
                      name={`orderDetail.order_meal_package[${index}].unit_price`}
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
                      name={`orderMealPackage[${index}].total_price`}
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
        <Controller
          name="shipping_fee"
          control={control}
          defaultValue={fCurrency(orderDetail.shipping_fee) || ""}
          disabled={!isEditing}
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
          name="total_amount"
          label="Total Amount"
          type="text"
          // value={fCurrency(calculateTotalAmount())
          defaultValue={fCurrency(orderDetail.total_amount) || ""}
          fullWidth
          margin="normal"
          disabled
        />

        {/* Order Note */}
        <Controller
          name="order_note"
          control={control}
          defaultValue=""
          disabled={!isEditing}
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
          name="shipping_note"
          control={control}
          defaultValue=""
          disabled={!isEditing}
          render={({ field }) => (
            <TextField
              {...field}
              label="Shipping Note"
              fullWidth
              margin="normal"
            />
          )}
        />
      </form>
      {/* {JSON.stringify(orderDetail)} */}
    </Container>
  );
};

export default OrderDetailPage;
