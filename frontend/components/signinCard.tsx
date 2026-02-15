"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useRedirectIfAuth from "@/auth";

export default function SigninCard() {
  const router = useRouter();
  useRedirectIfAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinRequest = async () => {
    const response = await fetch(
      "http://localhost:5000/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      console.log(response.status);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signinRequest();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Email address
              </label>

              <div className="mt-2">
                <input
                  required
                  type="email"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">
                Password
              </label>

              <div className="mt-2">
                <input
                  required
                  type="password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 font-semibold text-white hover:bg-indigo-400"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
