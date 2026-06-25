// import UserCard from "./UserCard";

// export default function Sidebar({setSelectedUser,users}) {

    
//     return (
//         <div className="w-80 border bg-white flex flex-col">
//             {/* Search Bar */}
//             <div className="p-4 border-b">
//                 <input
//                     type="text"
//                     placeholder="Search users..."
//                     className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* User List */}
//             <div className="flex-1 overflow-y-auto">
//                 {users.map((user) => (
//                     <UserCard key={user._id} user={user} setSelectedUser={setSelectedUser}/>
//                 ))}
//             </div>
//         </div>
//     );
// }

import UserCard from "./UserCard";

export default function Sidebar({ setSelectedUser, users }) {
  return (
    <div className="w-full md:w-80 border-r bg-white flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b flex-shrink-0">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </div>
    </div>
  );
}
