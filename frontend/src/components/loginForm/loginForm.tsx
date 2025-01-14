"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../src/store/userSlice";
import { useRouter } from "next/router";
import { error } from "console";

export default function LoginForm({
  successFunc,
}: Readonly<{ successFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<any>({
    mode: "onTouched",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/log-in`,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(
            setUser({
              id: res.data.id,
              username: res.data.username,
              nickname: res.data.nickname,
            })
          );
          successFunc();
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("ruh roh, 400");
          // set a username or pw incorrect error
        } else console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-rose">
          Log In
        </h3>

        <div className="w-80 mt-6">
          <label
            htmlFor="name"
            className="block font-normal leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="name"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose sm:text-sm sm:leading-6"
              placeholder=""
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-rose">
            {errors.username?.message as ReactNode}
          </p>
        </div>

        <div className="w-72 mt-6">
          <label
            htmlFor="password"
            className="block font-normal leading-4 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="password"
              id="password"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose sm:text-sm sm:leading-6"
              placeholder=""
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-rose">
            {errors.password?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 w-full mb-6 flex justify-center">
        <button
          type="submit"
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-sky-600 hover:scale-105 transition-all duration-300"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
