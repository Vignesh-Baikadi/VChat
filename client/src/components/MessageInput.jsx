import { useState } from "react";
import socket from "../services/socket";

function MessageInput({selectedUser,onSendMessage,}) {
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSend = () => {
    if(!selectedUser) return;
    if (!message.trim()) return;
    onSendMessage(message);
    socket.emit("stopTyping", {
      senderId: currentUser.id,
      receiverId: selectedUser._id,
    });
    setMessage("");
  };

  return (
    <div className="h-20 bg-[#232E3C] border-t border-[#2B5278] px-4 flex items-center gap-3">
      
      <input type="text" value={message} onChange={(e) => {
        setMessage(e.target.value);
        console.log("Typing emitted");
        socket.emit("typing",{
          senderId : currentUser.id,
          receiverId : selectedUser._id,
        });
      }}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 rounded-full bg-[#17212B] border border-[#2B5278] text-white focus:outline-none focus:border-[#3390EC]"
      />

      <button onClick={handleSend} className="px-5 py-3 bg-[#3390EC] hover:bg-[#2481DB] text-white rounded-xl">
        Send
      </button>

    </div>
  );
}

export default MessageInput;