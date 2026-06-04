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
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/auth/log-in`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setUser({
              id: res.data.id,
              username: res.data.username,
              nickname: res.data.nickname,
            }),
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
      className="flex flex-col items-center px-2"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-black tracking-tight mb-5 mt-4 text-wot-rose">
          Log In
        </h3>

        <div className="w-80 mt-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-wot-black mb-1.5"
          >
            Username
          </label>
          <input
            type="text"
            id="name"
            className="block w-full bg-wot-off-white rounded-xl border-0 px-3 py-2 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wot-rose text-sm"
            placeholder=""
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="mt-1.5 text-xs h-4 text-wot-rose font-medium">
            {errors.username?.message as ReactNode}
          </p>
        </div>

        <div className="w-80 mt-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-wot-black mb-1.5"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full bg-wot-off-white rounded-xl border-0 px-3 py-2 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wot-rose text-sm"
            placeholder=""
            {...register("password", {
              required: "Password is required",
            })}
          />
          <p className="mt-1.5 text-xs h-4 text-wot-rose font-medium">
            {errors.password?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <button
          type="submit"
          className="rounded-full bg-wot-rose px-8 py-2.5 font-semibold text-sm text-white shadow-md hover:shadow-lg hover:bg-wot-light-rose transition-all duration-300"
        >
          Log In
        </button>
      </div>
      <button
        type="button"
        onClick={signUpFunc}
        className="text-sm mt-4 mb-6 text-wot-rose underline underline-offset-2 hover:cursor-pointer hover:text-wot-light-rose transition"
      >
        No account? Sign up!
      </button>
    </form>
  );
}
