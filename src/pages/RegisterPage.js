import React, { useState } from "react";

import { FormProvider, FSelect, FTextField } from "../components/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../context/AuthContext";
import { useFrappePostCall } from "frappe-react-sdk";
import { Button } from "../utils/Button";

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.string().required("Role is required"),
});

const defaultValues = {
  first_name: "",
  email: "",
  password: "",
  confirm_password: "",
  role: "",
};

function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const { call, isSubmitting: isCreating } = useFrappePostCall(
    "emfresh_erp.em_fresh_erp.api.user.user.create_user_account"
  );

  const onSubmit = async (data) => {
    const { first_name, email, password, confirm_password, role } = data;

    try {
      const response = await call({
        first_name,
        email,
        password,
        confirm_password,
        role,
      });

      if (response.message.status === "success") {
        alert(response.message.message);
        navigate("/");
      } else {
        alert(response.message.message);
      }
    } catch (error) {
      console.error("Error creating user account:", error);
      alert("An error occurred while creating the user account");
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="success">
            Go back to{" "}
            <Link variant="subtitle2" component={RouterLink} to="/">
              Homepage
            </Link>
          </Alert>
          <FTextField name="first_name" label="First Name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FTextField
            name="confirm_password"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FSelect name="role" label="Role" defaultValues="">
            <MenuItem value="Staff">Staff</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </FSelect>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
