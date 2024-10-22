import { Box } from "@mui/material";
import React from "react";
import { useFrappeGetCall } from "frappe-react-sdk";

import MealPkgList from "../components/MealPkgList";
import LoadingScreen from "../components/LoadingScreen";

function MealPackagePage() {
  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.meal_package.meal_package.get_meals"
  );

  const meals = data?.message.meals;
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Box component="main">
      <MealPkgList
        items={meals}
        listName={"Meal Packages"}
        onRowClick={() => {
          return true;
        }}
      ></MealPkgList>
    </Box>
  );
}

export default MealPackagePage;
