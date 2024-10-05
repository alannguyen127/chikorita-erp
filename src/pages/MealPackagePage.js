import { Box, Toolbar } from "@mui/material";
import React from "react";

import MealPkgList from "../components/MealPkgList";
import { mealPackages } from "../test_data/meal_package";

function MealPackagePage() {
  return (
    <Box component="main">
      <Toolbar />
      <MealPkgList
        items={mealPackages}
        listName={"Meal Packages:"}
      ></MealPkgList>
    </Box>
  );
}

export default MealPackagePage;
