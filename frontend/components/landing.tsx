"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Landing() {
  const router = useRouter();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
        setIsLoggedIn(true)
    }
    else{
        setIsLoggedIn(false)
    }
   })

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

    
      <div className="border-b border-white/10 px-6 py-4 flex justify-between">
        <h2 className="font-semibold text-lg">TaskTrack</h2>

        <div className="flex gap-4">
           {isLoggedIn ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-400 hover:text-white"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="text-gray-400 hover:text-white"
            >
              Sign in
            </button>
          )}

         
        </div>
      </div>

      
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="text-center max-w-xl">

          <h1 className="text-4xl font-bold mb-4">
            Organize your work. Focus on what matters.
          </h1>

          <p className="text-gray-400 mb-8">
            TaskTrack helps you manage your daily tasks, stay productive, and
            never lose track of your goals.
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="bg-indigo-500 px-6 py-3 rounded-lg text-lg hover:bg-indigo-400"
          >
            Get started
          </button>

        </div>
      </div>
    </div>
  );
}
