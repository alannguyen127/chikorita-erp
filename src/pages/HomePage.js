import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

function HomePage() {
  const { user } = useAuth;
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    { value: "profile", icon: <AccountBoxIcon sx={{ fontSize: 24 }} /> },
    { value: "friends", icon: <PeopleAltIcon sx={{ fontSize: 24 }} /> },
    { value: "requests", icon: <ContactMailIcon sx={{ fontSize: 24 }} /> },
    {
      value: "add_friend",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
    },
  ];

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}

export default HomePage;
