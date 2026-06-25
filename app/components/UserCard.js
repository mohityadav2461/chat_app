export default function UserCard({ user,setSelectedUser}) {
  return (
    <div className="flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-100 transition " onClick={()=>{setSelectedUser(user)}}>
      
      <div className="relative">
        <img
          src={user.image}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />

        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            user.online ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{user.name}</h3>

        <p className="text-sm text-gray-500 truncate">
          {user.lastMessage}
        </p>
      </div>

      {user.unread > 0 && (
        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {user.unread}
        </div>
      )}
    </div>
  );
}