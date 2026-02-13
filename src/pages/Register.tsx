import { useState } from "react";
import Logo from "../assets/logo.png";
import { FaGoogle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="w-120 mx-auto text-white">
      <div className="h-200 flex flex-col items-center">
        <img src={Logo} className="w-40 pt-10" />
        <div
          style={{ backgroundColor: "#151f2e" }}
          className="my-8 p-10 rounded-lg w-full"
        >
          <h1 className="text-2xl font-medium font-sans mb-5">
            Create a PipedPiper account
          </h1>
          <form>
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Email
              </label>
              <input
                id="id"
                type="email"
                className="bg-[#242f40] w-full px-4 py-2 outline-0 rounded-xs"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-400 mb-2 mt-4"
              >
                password
              </label>
              <span className="flex items-center bg-[#242f40] pr-4">
                <input
                  id="password"
                  type={show ? "password" : "text"}
                  className="bg-[#242f40] w-full px-4 py-2 outline-0 rounded-xs"
                />
                <button
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
            </div>
            <button className="bg-[#37cc37] w-full px-4 py-2 outline-0 rounded-md mt-5 mb-3 text-black font-medium font-sans cursor-pointer hover:opacity-80">
              Sign up
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="grow border-t border-gray-600"></div>
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <div className="grow border-t border-gray-600"></div>
          </div>
          <button className="w-full outline-1 outline-gray-500 py-2 font-medium rounded-medium mb-4 hover:bg-gray-800">
            <FaGoogle className="inline mx-1" size={20} />
            Sign up with Google
          </button>
          <div className="flex items-center gap-1 mt-5">
            <span className="text-gray-400">
              Already have a PipedPiper account?
            </span>

            <Link
              to="/login"
              className="group text-[#37cc37] flex items-center gap-1"
            >
              Sign In
              <FaArrowRight
                size={10}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-gray-400 flex flex-col items-center text-xs">
        <h2>
          Copyright © 2026{" "}
          <a href="#" className="underline hover:text-[#37cc37]">
            PiedPiper
          </a>
        </h2>
        <h2 className="my-1">
          All Rights Reserved.{" "}
          <a href="#" className="underline hover:text-[#37cc37]">
            User Agreement
          </a>
          ,{" "}
          <a href="#" className="underline hover:text-[#37cc37]">
            Privacy Notice
          </a>
        </h2>
      </div>
    </div>
  );
};

export default Register;
