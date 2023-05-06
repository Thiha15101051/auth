import { PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/ContactApi";


const Register = () => {
  const [register]=useRegisterMutation();
  const nav=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error,setError]=useState('');


  const RegisterFormHandler=async(e)=>{
    try {
      e.preventDefault();
      const user = { name, email, password, password_confirmation };
      const {data,error}=await register(user);
      if (data?.success) {
        setError('');
        nav("/login")
      } else if(error?.status===422){
        setError(error.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className=" h-screen flex items-center justify-center">
      <form
        onSubmit={RegisterFormHandler}
        className=" w-96 flex flex-col gap-4 shadow-lg p-10 rounded"
      >
        <h1 className=" text-2xl text-center font-semibold text-sky-500">
          Register
        </h1>
        <TextInput
          className="shadow-lg"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="Enter your name . . ."
        />
        <div>
          <TextInput
            className="shadow-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Enter your email . . ."
          />
          {error.length === 0 ? null : <p className=" my-0 text-sm text-red-600">{error}</p>}
        </div>
        <PasswordInput
          className="shadow-lg"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Enter your password"
        />
        <PasswordInput
          className="shadow-lg"
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
          value={password_confirmation}
          placeholder="Confirm password"
        />
        <div className=" flex items-center justify-around">
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
