import React from "react";
import { useLogOutMutation } from "../redux/api/authApi";
import Header from "../components/header";
import ContactTable from "../components/ContactTable";

const Dashboard = () => {
  return (
    <>
      <Header/>
      <ContactTable/>
    </>
  );
};

export default Dashboard;
