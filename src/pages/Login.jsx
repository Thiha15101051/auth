import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/services/UserSlice";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Login = () => {
  const [error,setError]=useState('');
  const nav=useNavigate();
  const dispatch = useDispatch();
  const [Login,{isLoading}] = useLoginMutation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "password must have at least 6 letters" : null,
    },
  });
  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data } = await Login(values);
          if (data?.success) {
            dispatch(setUserData(data));
            setError("");
            nav("/");
          } else if (!data?.success) {
            setError(data?.message);
          }
        })}
        className=" w-96 flex flex-col gap-8 shadow-lg p-10 rounded"
      >
        <h1 className=" text-2xl text-center font-semibold text-sky-500">
          Login
        </h1>
        <TextInput
          placeholder="Enter your email . . ."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        {error?.length === 0 ? null : (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
        <div className=" flex items-center justify-center">
          <p className=" text-gray-600">Not a member?</p>
          <Link to={"/register"}>
            <p className="text-sky-700 underline cursor-pointer">Sign up now</p>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-sky-500 py-1 px-3 text-white rounded-lg shadow-lg flex items-center gap-2"
          >
            Sign in{
              isLoading===true ? <Loader color="white" size='xs'/>:null
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
