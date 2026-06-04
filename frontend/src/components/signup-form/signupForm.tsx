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
    mode: "onChange",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Passwords must match" },
        { shouldFocus: true },
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
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/auth/sign-up`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setToast({ error: false, message: "Signed up successfully!" }),
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
            { shouldFocus: true },
          );
        } else
          dispatch(setToast({ error: true, message: "Something went wrong." }));
      });
  }

  const inputClass =
    "block w-full bg-wot-off-white rounded-xl border-0 px-3 py-2 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wot-blue text-sm";
  const labelClass =
    "block text-sm font-medium leading-6 text-wot-black mb-1.5";
  const errorClass = "mt-1.5 text-xs h-4 text-wot-blue font-medium";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col items-center px-2"
    >
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-black tracking-tight mb-5 mt-4 text-wot-blue">
          Sign Up
        </h3>

        <div className="w-80 mt-4">
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={inputClass}
            placeholder=""
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 20,
                message: "Must be no longer than 20 characters.",
              },
              minLength: {
                value: 4,
                message: "Must be at least 4 characters.",
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Must only contain alphanumeric characters",
              },
            })}
          />
          <p className={errorClass}>{errors.username?.message as ReactNode}</p>
        </div>

        <div className="w-80 mt-3">
          <label htmlFor="nickname" className={labelClass}>
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            className={inputClass}
            placeholder=""
            {...register("nickname", {
              required: "Nickname is required",
              maxLength: {
                value: 20,
                message: "Must be no longer than 20 characters.",
              },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Must only contain alphanumeric characters",
              },
            })}
          />
          <p className={errorClass}>{errors.nickname?.message as ReactNode}</p>
        </div>

        <div className="w-80 mt-3">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={inputClass}
            placeholder=""
            {...register("password", {
              required: "Password is required",
              maxLength: {
                value: 30,
                message: "Must be no longer than 30 characters.",
              },
              minLength: {
                value: 12,
                message: "Must be at least 12 characters.",
              },
              pattern: {
                value: /^[^<>{}>\s\/\\]*$/,
                message: "Must not contain spaces or: <, >, {, }, \\, /",
              },
            })}
          />
          <p className={errorClass}>{errors.password?.message as ReactNode}</p>
        </div>

        <div className="w-80 mt-3">
          <label htmlFor="password-confirm" className={labelClass}>
            Confirm Password
          </label>
          <input
            type="password"
            id="password-confirm"
            className={inputClass}
            placeholder=""
            {...register("passwordConfirm", {
              required: "Password must match",
            })}
          />
          <p className={errorClass}>
            {errors.passwordConfirm?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-4 w-full mb-6 flex justify-center">
        <button
          type="submit"
          className="rounded-full bg-wot-blue px-8 py-2.5 font-semibold text-sm text-white shadow-md hover:shadow-lg hover:bg-wot-light-blue transition-all duration-300"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
