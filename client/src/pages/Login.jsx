import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-[#17212B] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#232E3C] rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="h-20 w-20 rounded-full bg-[#3390EC] flex items-center justify-center shadow-lg">
            <svg
              xmlns="https://vinitkumarpatwa.netlify.app/apps/vchat/assets/images/logo.png"
              fill="white"
              viewBox="0 0 24 24"
              className="w-10 h-10"
            >
              <path d="M21.944 2.506a1.5 1.5 0 0 0-1.604-.222L2.897 10.06a1.5 1.5 0 0 0 .142 2.796l4.89 1.63 1.63 4.89a1.5 1.5 0 0 0 2.796.142l7.776-17.443a1.5 1.5 0 0 0-.187-1.569zM9.614 13.326l8.79-7.286-6.502 9.29-.985-2.956-1.303-.434z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-center text-[#AAB2BD] mt-2 mb-8">
          Sign in to continue chatting
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-[#AAB2BD] mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                px-4
                py-3
                bg-[#17212B]
                border
                border-[#2B5278]
                rounded-xl
                text-white
                placeholder:text-gray-500
                focus:outline-none
                focus:border-[#3390EC]
                focus:ring-2
                focus:ring-[#3390EC]/30
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm text-[#AAB2BD] mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4
                py-3
                bg-[#17212B]
                border
                border-[#2B5278]
                rounded-xl
                text-white
                placeholder:text-gray-500
                focus:outline-none
                focus:border-[#3390EC]
                focus:ring-2
                focus:ring-[#3390EC]/30
                transition
              "
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#AAB2BD]">
              <input
                type="checkbox"
                className="accent-[#3390EC]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-[#3390EC] hover:text-[#2481DB]"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-[#3390EC]
              hover:bg-[#2481DB]
              text-white
              font-medium
              transition-all
              duration-200
            "
          >
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#2B5278]" />
          <span className="px-3 text-[#6D7883] text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-[#2B5278]" />
        </div>

        {/* Register */}
        <p className="text-center text-[#AAB2BD]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#3390EC] hover:text-[#2481DB] font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;