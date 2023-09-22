import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://ec2-3-6-158-164.ap-south-1.compute.amazonaws.com:8080/api/auth/v1/admin/login/',
        {
          userName: data.email, // Assuming "email" corresponds to the user's email.
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
        }
      );

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;

        // Store the token in localStorage
        localStorage.setItem('accessToken', accessToken);

        dispatch(handleLogin(true));
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 2000, // Duration in milliseconds
        });
        navigate('/dashboard');
      } else {
        // Handle login error, e.g., display an error message.
        console.error('Login failed');
        toast.error('Login failed', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle any network or other errors.
      console.error('Login failed:', error);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
        {...register('email')}
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        {...register('password')}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <button type="submit" className="btn btn-primary block w-full text-center">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
