"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import useRedirectIfAuth from "@/auth"

export default function SignupCard() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()
     useRedirectIfAuth()

    
   const  signupRequest = async()=>{
    
    const response = await fetch('http://localhost:5000/api/auth/signup',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:username,
            email:email,
            password:password
      })

    })
    console.log(response);
    
    if(response.ok){
    
    const data = await response.json()
    localStorage.setItem('token',data.token)
     router.push('/dashboard')
   
    
    }
    else{
      console.log(response.status)
      
    }
    
    
   
}

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
            onSubmit={(e)=>{
                e.preventDefault()
                signupRequest()

                

            }}
           method="POST" 
           className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
                Username
              </label>
              <div className="mt-2">
                <input
               
                onChange={(e)=>setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                 onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                Password
              </label>
              <div className="mt-2">
                <input
              
                onChange={(e)=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already a member?{' '}
            <a href="/signin" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign in to your account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}




