import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Sign = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Sign in using your account
        </p>

        {/* Google Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-100 transition duration-200 mb-4 shadow-sm"
        >
          <img
            src="https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* GitHub Button */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition duration-200 shadow-sm"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/025/270/403/original/github-logo-icon-free-vector.jpg"
            alt="GitHub"
            className="w-5 h-5 invert"
          />
          Continue with GitHub
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          By signing in, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
    </div>
  )
}

export default Sign