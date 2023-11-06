import { useAuthActions } from "actions/auth.actions";
import { useForm } from "react-hook-form";

type DataType = {
  email: string;
  password: string;
};
const Login = () => {
  const { register, handleSubmit } = useForm<DataType>();
  const authActions = useAuthActions();
  const onSubmit = (data: DataType) => {
    authActions.login(data);
  };
  return (
    <div className="min-h-screen flex items-center bg-slate-300">
      <div className="bg-white p-10 w-1/3 mx-auto rounded">
        <div className="flex w-full justify-center text-xl font-semibold mb-4">
          <h1>Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mb-5">
            <label className="w-20 inline-block text-right mr-4 text-gray-500">
              Email
            </label>
            <input
              id="name"
              type="email"
              placeholder="admin@admin.com"
              className="border-0 border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-0 focus:ring-0 focus:border-b-2 focus:outline-none"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>

          <div className="flex items-center mb-10">
            <label className="w-20 inline-block text-right mr-4 text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="border-0 border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-0 focus:ring-0 focus:border-b-2 focus:outline-none"
              {...register("password", { required: true })}
            />
          </div>
          <div className="text-right">
            <button className="py-3 px-8 bg-purple-700 text-green-100 font-bold rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
