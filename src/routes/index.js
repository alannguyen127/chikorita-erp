import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import CustomerPage from "../pages/CustomerPage";
import OrderPage from "../pages/OrderPage";
import MealPackagePage from "../pages/MealPackagePage";
import OrderDetailPage from "../pages/OrderDetailPage";
import CustomerDetailPage from "../pages/CustomerDetailPage";

import AddCustomerPage from "../pages/AddCustomerPage";
import AddOrderPage from "../pages/AddOrderPage";
import AuthRequire from "./AuthRequire";
import DashboadPage from "../pages/DashboadPage";
// import { useAuth } from "../context/AuthContext";

function Router() {
  // const { currentUser } = useAuth();
  // console.log("log from router: ", currentUser);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<DashboadPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="meal_package" element={<MealPackagePage />} />
        <Route path="account" element={<AccountPage />} />

        <Route path="customer/:customerId" element={<CustomerDetailPage />} />
        <Route path="customer/add_customer" element={<AddCustomerPage />} />
        <Route path="order/:orderID" element={<OrderDetailPage />} />
        <Route path="order/add_order" element={<AddOrderPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
