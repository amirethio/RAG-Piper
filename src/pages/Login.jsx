import { useState } from "react";
import { Link } from "react-router";
import Logo from "../assets/logo.png";
import { FaGoogle, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { submitLogin } from "../services/auth.service.js";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await submitLogin(formData);
      console.log(response);
      if (response.success == true) {
        navigate("/");
      }
    } catch (error) {
      setErrors("something went wrong");
    }
  };
  return (
    <div className="max-w-md mx-auto text-white mt-10">
      <img src={Logo} className="w-40 mx-auto mb-6" />

      <div className="bg-card p-6 rounded-md">
        <h1 className="text-2xl font-medium mb-4">Sign in to PipedPiper</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded bg-[#242f40] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <div className="flex items-center bg-[#242f40] rounded">
              <input
                type={showPassword ? "password" : "text"}
                className="flex-1 px-3 py-2 bg-[#242f40] outline-none rounded-l"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2"
                value={password}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="w-full py-2 bg-green-500 text-black rounded hover:opacity-80"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-gray-400 mt-2 cursor-pointer hover:text-green-500">
          Forgot Password?
        </div>

        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        <button className="w-full py-2 border border-gray-500 rounded hover:bg-gray-800 flex items-center justify-center gap-2">
          <FaGoogle size={18} /> Sign in with Google
        </button>

        <div className="text-sm text-gray-400 mt-4">
          New to PipedPiper?{" "}
          <Link to="/signup" className="text-green-500 flex items-center gap-1">
            Create Account <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      <footer className="text-gray-400 text-xs text-center mt-6">
        © 2026{" "}
        <a href="#" className="underline hover:text-green-500">
          PiedPiper
        </a>{" "}
        | All Rights Reserved
      </footer>
    </div>
  );
};

export default Login;
