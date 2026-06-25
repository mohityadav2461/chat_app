import { useSession, signIn, signOut } from "next-auth/react"


export default function MessageBubble({ message }) {
  const { data: session, status } = useSession()

  const isMe = message.sender != session.user._id;

  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-xl ${
        isMe
          ? "bg-blue-500 text-white self-end"
          : "bg-white border self-start"
      }`}
    >
      {message.text}
    </div>
  );
}