import { Box } from "@mui/material";
import React from "react";
import { useFrappeGetCall } from "frappe-react-sdk";

import MealPkgList from "../components/MealPkgList";

function MealPackagePage() {
  const { data, error, isLoading } = useFrappeGetCall(
    "emfresh_erp.em_fresh_erp.api.meal_package.meal_package.get_meals"
  );

  const meals = data?.message.meals;
  if (isLoading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Box component="main">
      <MealPkgList items={meals} listName={"Meal Packages"}></MealPkgList>
    </Box>
  );
}

export default MealPackagePage;
