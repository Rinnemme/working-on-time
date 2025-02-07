import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "@/src/store/toastSlice";

export default function SignupForm({
  successFunc,
}: Readonly<{ successFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, setError } = useForm<any>({
    mode: "onTouched",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Passwords must match" },
        { shouldFocus: true }
      );
      return;
    }
    axios({
      method: "POST",
      data: {
        username: data.username,
        nickname: data.nickname,
        password: data.password,
      },
      url: `${process.env.baseURI}/sign-up`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setToast({ error: false, message: "Signed up successfully!" })
          );
          successFunc();
        }
      })
      .catch((err) => {
        if (
          err.response.data.detail ===
          `Key (username)=(${data.username}) already exists.`
        ) {
          setError(
            "username",
            {
              message: `The username ${data.username} is taken.`,
            },
            { shouldFocus: true }
          );
        } else
          dispatch(setToast({ error: true, message: "Something went wrong." }));
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-blue">
          SignUp
        </h3>

        <div className="w-80 mt-6">
          <label
            htmlFor="username"
            className="block font-normal leading-6 text-wot-black"
          >
            Username
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="username"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              placeholder=""
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.username?.message as ReactNode}
          </p>
        </div>

        <div className="w-80 mt-6">
          <label
            htmlFor="nickname"
            className="block font-normal leading-6 text-wot-black"
          >
            Nickname
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="nickname"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              placeholder=""
              {...register("nickname", {
                required: "Nickname is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.nickname?.message as ReactNode}
          </p>
        </div>

        <div className="w-72 mt-6">
          <label
            htmlFor="password"
            className="block font-normal leading-4 text-wot-black"
          >
            Password
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="password"
              id="password"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              placeholder=""
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.password?.message as ReactNode}
          </p>
        </div>

        <div className="w-72 mt-6">
          <label
            htmlFor="password-confirm"
            className="block font-normal leading-4 text-wot-black"
          >
            Confirm Password
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="password"
              id="password-confirm"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              placeholder=""
              {...register("passwordConfirm", {
                required: "Password must match",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.passwordConfirm?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 w-full mb-6 flex justify-center">
        <button
          type="submit"
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-blue px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-green hover:scale-105 transition-all duration-300"
        >
          SignUp
        </button>
      </div>
    </form>
  );
}
