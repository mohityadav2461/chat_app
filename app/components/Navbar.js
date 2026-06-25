"use client"
import React from 'react'

import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession();

    return (
        
        <div className="h-16 border-b flex items-center justify-between px-6 bg-white">
            <div className='flex gap-2'><img
                src="/image.png"
                alt="profile"
                className="w-7 h-7 rounded"
            />
                <h1 className="text-xl font-bold"> ChatApp</h1>
            </div>

            <div className="flex items-center gap-3">
                <img
                    src={session.user.image}
                    alt="profile"
                    className="w-11 h-11 rounded"
                />
            </div>
        </div>
    )
}

export default Navbar
