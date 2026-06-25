"use client"

import { useSession } from "next-auth/react";
import Sign from "./components/Sign";
import ChatWindow from "./components/ChatWindow";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { data: session, status } = useSession();
  const [curr_user, setCurrUser] = useState(null);
  const [chats, setChats] = useState({})

  function addMessage(savedMessage) {
    if(!curr_user)return;
    const otherUser =
      savedMessage.sender === curr_user
        ? savedMessage.receiver
        : savedMessage.sender;

    setChats(prev => ({

      ...prev,

      [otherUser]: [

        ...(prev[otherUser] || []),

        savedMessage

      ]

    }));
  }
  async function initialize(session) {
    if (!session) return;

    const temp = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }),
    });
    const user = await temp.json();
    setCurrUser(user);



    const res = await fetch("/api/user", {
      method: "GET",
    });
    const users = await res.json();
    setUsers(users);


    const all_data = await fetch(`/api/msg?curruser=${user?._id}`, {
      method: "GET",
    });

    const all_msg = await all_data.json();

    const groupedChats = {};

    for (const msg of all_msg) {
      const otherUser =
        msg.sender === user
          ? msg.receiver
          : msg.sender;

      if (!groupedChats[otherUser]) {
        groupedChats[otherUser] = [];
      }

      groupedChats[otherUser].push(msg);
    }

    setChats(groupedChats);
  }




useEffect(() => {
  if (status === "authenticated") {
    initialize(session);
  }
}, [session]);

if (status === "loading") {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

if (!session) {
  return <Sign />;
}

return (
  <div className="h-screen flex flex-col bg-gray-100">
    <Navbar />

    <div className="flex flex-1 overflow-hidden">

      {/* Sidebar */}
      <div
        className={`${selectedUser
          ? "hidden md:flex"
          : "flex"
          } w-full md:w-80 lg:w-96`}
      >
        <Sidebar
          users={users}
          setSelectedUser={setSelectedUser}
        />
      </div>

      {/* Chat */}
      <div
        className={`${selectedUser
          ? "flex"
          : "hidden md:flex"
          } flex-1`}
      >
        <ChatWindow
          selectedUser={selectedUser}
          curr_user={curr_user}
          setSelectedUser={setSelectedUser}
          messages={
            selectedUser
              ? chats[selectedUser._id] || []
              : []
          }
          addMessage={addMessage}
        />
      </div>

    </div>
  </div>
)
};