"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Sign from "./components/Sign.js";
import ChatWindow from './components/ChatWindow'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'


export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const { data: session, status } = useSession()
  const [curr_user, setCurrUser] = useState(null);


  async function initialize(session) {
    if(!session)return;

    // Step 1
    const temp=await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      })
    })
    const user=await temp.json( )

    setCurrUser(user)

    const res = await fetch("/api/user",{
      method:"GET"
    })
    const users = await res.json()
    setUsers(users)
  }
  useEffect(() => {
    initialize(session)
  }, [session])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }




  if (session) {
    return (
      <div className='h-screen flex flex-col'>
        <Navbar/>
        <div className='flex flex-1 overflow-hidden'>
          <Sidebar setSelectedUser={setSelectedUser} users={users} />
          <ChatWindow selectedUser={selectedUser} curr_user={curr_user} />
        </div>
      </div>
    );
  }
  else {
    return (
      <>
        <Sign />
      </>
    )
  }

}
