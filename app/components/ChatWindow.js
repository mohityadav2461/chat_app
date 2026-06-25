import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

import { useEffect, useState, useRef } from "react";

export default function ChatWindow({
  selectedUser,
  curr_user,
  setSelectedUser,
  messages,
  addMessage
}) {
  const containerRef = useRef(null);

  

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 border-l bg-white flex flex-col h-full">

      {/* Header */}
      <div className="h-16 border-b bg-white px-4 md:px-6 flex items-center gap-3">

        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-2xl font-semibold mr-1"
        >
          ←
        </button>

        <img
          src={selectedUser.image}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="min-w-0">
          <h2 className="font-semibold truncate">
            {selectedUser.name}
          </h2>

          <p className="text-sm text-green-500">
            Online
          </p>
        </div>
      </div>

      {/* Messages */}

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50"
      >
        {messages?.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            curr_user={curr_user}
          />
        ))}
      </div>

      {/* Input */}

      <MessageInput
        addMessage={addMessage}
        selectedUser={selectedUser}
        curr_user={curr_user}
      />
    </div>
  );
}