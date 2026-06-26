
"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-white flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/image.png"
          alt="profile"
          className="w-7 h-7 rounded"
        />

        <h1 className="text-xl font-bold">ChatApp</h1>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <img
          src={session.user.image}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <button
          onClick={signOut}
          className="text-sm md:text-base hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;