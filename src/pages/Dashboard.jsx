import React from "react";
import { useSelector } from "react-redux";
import { useLogOutMutation } from "../redux/api/ContactApi";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.USER);
  const [logout] = useLogOutMutation();
  const LogOut = async() => {
    const data = await logout(user.id);
    console.log(data)
  };
  return (
    <>
      <div className="flex justify-end p-5 shadow-md">
        <button
          onClick={LogOut}
          className=" px-2 py-1 bg-sky-500 text-white rounded shadow-md"
        >
          Log Out
        </button>
      </div>
      <div>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
      </div>
    </>
  );
};

export default Dashboard;
