import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { setToast } from "@/src/store/toastSlice";
import { setIsLoading } from "@/src/store/loadingSlice";

export default function LoginForm({
  successFunc,
  signUpFunc,
}: Readonly<{ successFunc: () => void; signUpFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, setError } = useForm<any>({
    mode: "onChange",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    dispatch(setIsLoading(true));
    axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/log-in`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setUser({
              id: res.data.id,
              username: res.data.username,
              nickname: res.data.nickname,
            })
          );
          dispatch(setToast({ error: false, message: "Login successful!" }));
          successFunc();
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setError("password", { message: err.response.data.message });
        } else
          dispatch(setToast({ error: true, message: "Something went wrong." }));
      })
      .finally(() => {
        setTimeout(() => dispatch(setIsLoading(false)), 500);
      });
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-rose">
          Log In
        </h3>

        <div className="w-80 mt-6">
          <label
            htmlFor="name"
            className="block font-normal leading-6 text-wot-black"
          >
            Username
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="name"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose sm:text-sm sm:leading-6"
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
            className="block font-normal leading-4 text-wot-black"
          >
            Password
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="password"
              id="password"
              className="block w-50 bg-wot-off-white rounded-2xl border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose sm:text-sm sm:leading-6"
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
      <div className="mt-5 sm:mt-6 w-full flex justify-center">
        <button
          type="submit"
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
        >
          Log In
        </button>
      </div>
      <div
        onClick={signUpFunc}
        className="w-fit text-sm px-3 py-1 mb-6 mt-2 text-center bg-wot-white border rounded-full hover:cursor-pointer transition text-wot-rose border-wot-rose hover:text-wot-yellow hover:border-wot-yellow"
      >
        No account? Sign up!
      </div>
    </form>
  );
}
