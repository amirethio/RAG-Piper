import { useState } from "react";
import { Link } from "react-router";
import Logo from "../assets/logo.png";
import { FaGoogle, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { submitRegister } from "./../services/auth.service.js";
import { useNavigate } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await submitRegister(formData);
      if (response?.success == true) {
        setMessage(response?.message);
        navigate("/login");
      } else {
        setMessage("something went wrong");
      }
    } catch (error) {
      setErrors("something went wrong");
    }
  };
  return (
    <div className="max-w-md mx-auto text-white mt-10">
      <img src={Logo} className="w-40 mx-auto mb-6" />

      <div className="bg-[#151f2e] p-6 rounded-md">
        <h1 className="text-2xl font-medium mb-4">
          Create a PipedPiper account
        </h1>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            className="w-full py-2 bg-green-500 text-black rounded hover:opacity-80"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        <button className="w-full py-2 border border-gray-500 rounded hover:bg-gray-800 flex items-center justify-center gap-2">
          <FaGoogle size={18} /> Sign up with Google
        </button>

        <div className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 flex items-center gap-1">
            Sign In <FaArrowRight size={12} />
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

export default Register;
