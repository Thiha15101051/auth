import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogOutMutation } from "../redux/api/authApi";
import Cookies from "js-cookie";
import { removeUserAcc } from "../redux/services/UserSlice";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch=useDispatch();
    const nav=useNavigate();
    const token=Cookies.get('token');
    const data=Cookies.get('user');
    const user=JSON.parse(data);
    const [logout,{isLoading}] = useLogOutMutation();
    const LogOut = async () => {
      const {data,error} = await logout(token);
      if (data?.success) {
        dispatch(removeUserAcc());
        Cookies.remove('token');
        Cookies.remove('user');
        nav('/login')
      }
    };
  return (
    <>
      <div className="flex justify-between p-5 shadow-md">
        <div>
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
        </div>
        <button
          disabled={isLoading}
          onClick={LogOut}
          className=" px-2 py-1 bg-sky-500 text-white rounded flex items-center gap-2 shadow-md"
        >
          Log Out
          {isLoading === true ? <Loader color="white" size="xs" /> : null}
        </button>
      </div>
    </>
  );
};

export default Header;
