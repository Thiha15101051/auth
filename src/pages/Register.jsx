import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";

const Register = () => {
  const [error,setError]=useState('');
  const [register] = useRegisterMutation();
  const nav = useNavigate();
    const form = useForm({
      initialValues: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },

      validate: {
        name: (value) =>
          value.length < 2 ? "Name must have at least 2 letters" : null,
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        password: (value) =>
          value.length < 6 ? "password must have at least 6 letters" : null,
        password_confirmation: (value, values) =>
          value !== values.password ? "password did not match" : null,
      },
    });
  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          const { data, error } = await register(values);
          if (data?.success) {
            nav("/login");
          } else if (error) {
            setError(error?.data?.message);
          }
        })}
        className=" w-96 flex flex-col gap-3 shadow-lg p-10 rounded"
      >
        <h1 className=" text-2xl text-center font-semibold text-sky-500">
          Register
        </h1>
        <TextInput
          placeholder="Enter your name . . ."
          {...form.getInputProps("name")}
        />
        <div>
          <TextInput
            placeholder="Enter your email . . ."
            {...form.getInputProps("email")}
          />
        </div>
        <PasswordInput
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Confirm password"
          {...form.getInputProps("password_confirmation")}
        />
        <p className="text-center m-0 text-sm text-red-600">{error?.length!==0 ? error:null}</p>
        <div className=" flex items-center justify-center gap-2">
          <p className=" text-gray-600">Already have an account?</p>
          <Link to={"/login"}>
            <p className="text-sky-700 underline cursor-pointer">to login</p>
          </Link>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="bg-sky-500 py-1 px-3 text-white rounded-lg shadow-lg"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
