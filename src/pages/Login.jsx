import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/ContactApi";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/services/UserSlice";

const Login = () => {
  const dispatch=useDispatch();
  const [Login]=useLoginMutation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav=useNavigate();
  const [error, setError] = useState("");

  const LoginFormHandler=async(e)=>{
    e.preventDefault();
    console.log(email,password)
    const user={email,password};
    const {data}=await Login(user);

    console.log(data)
    if (data?.success) {
      dispatch(setUserData(data
        ))
      setError('');
      nav('/')
    }else if(!data?.success){
      setError('email and password are not correct!')
      console.log(data?.success)
    }
  }
  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={LoginFormHandler}
        className=" w-96 flex flex-col gap-4 shadow-lg p-10 rounded"
      >
        <h1 className=" text-2xl text-center font-semibold text-sky-500">
          Login
        </h1>
        <TextInput
          className="shadow-lg"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Enter your email . . ."
        />
        <PasswordInput
          className="shadow-lg"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Enter your password"
        />
        {error.length === 0 ? null : (
          <p className=" my-0 text-sm text-red-600">{error}</p>
        )}
        <div className=" flex items-center justify-around my-3">
          <p className=" text-gray-600">Not a member?</p>
          <Link to={"/register"}>
            <p className="text-sky-700 underline cursor-pointer">Sign up now</p>
          </Link>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="bg-sky-500 py-1 px-3 text-white rounded-lg shadow-lg"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
