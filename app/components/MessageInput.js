// import { useState } from "react";


// export default function MessageInput({messages,setMessages,selectedUser,curr_user}) {



//   const [input,setInput]=useState("")

//     const save_msg=async ()=>{
//     if (input.trim() === "") return; 


//     const message = {
//       sender:curr_user._id,
//       receiver: selectedUser._id, 
//       text: input,
//       seen: false,
//       delivered: true,
//       deleted: false,
//     };
//     setInput("")

//     try {
//       const req=await fetch("/api/msg", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//       const savedMessage = await req.json();
//       setMessages([...messages,savedMessage])
//     }
//     catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="p-4 border-t bg-white flex gap-3">
//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="flex-1 border rounded-lg px-4 py-2 outline-none"
//       />


//       <button className="bg-blue-500 text-white px-5 rounded-lg hover:bg-blue-600" onClick={()=>{save_msg()}}>
//         Send
//       </button>
//     </div>
//   );
// }


import { useState } from "react";

export default function MessageInput({
  addMessage,
  selectedUser,
  curr_user,
}) {
  const [input, setInput] = useState("");

  const save_msg = async () => {
    if (input.trim() === "") return;

    const message = {
      sender: curr_user._id,
      receiver: selectedUser._id,
      text: input,
      seen: false,
      delivered: true,
      deleted: false,
    };

    setInput("");

    try {
      const req = await fetch("/api/msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const savedMessage = await req.json();

      addMessage(savedMessage)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 outline-none"
      />

      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => {
          save_msg();
        }}
      >
        Send
      </button>
    </div>
  );
}