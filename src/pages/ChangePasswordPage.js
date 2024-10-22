import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFrappeAuth, useFrappePutCall } from "frappe-react-sdk";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useFrappeAuth();

  const { call, isLoading } = useFrappePutCall(
    "emfresh_erp.em_fresh_erp.api.user.user.change_password"
  );

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }
    try {
      const response = await call({
        user_id: currentUser,
        old_password: oldPassword,
        new_password: newPassword,
      });
      console.log(response.message);
      if (response.message.status === "success") {
        setError("");
        alert(response.message.message);
      }
    } catch (err) {
      setError(err?.message || "Failed to change password.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>

      <form onSubmit={handleChangePassword}>
        <TextField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3 }}
        >
          {isLoading ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
