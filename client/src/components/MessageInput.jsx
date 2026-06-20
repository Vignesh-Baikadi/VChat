import { useState,useRef } from "react";
import socket from "../services/socket";
import {MdSend,MdOutlineEmojiEmotions} from "react-icons/md";

function MessageInput({selectedUser,onSendMessage,}) {
  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  //handles typing indicator
  const handleTyping = (value) => {
    setMessage(value);

    socket.emit("typing", {
      senderId: currentUser.id,
      receiverId: selectedUser._id,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(
        typingTimeoutRef.current
      );
    }

    typingTimeoutRef.current =
      setTimeout(() => {
        socket.emit("stopTyping", {
          senderId: currentUser.id,
          receiverId: selectedUser._id,
        });

      }, 1500);

  };
  const handleSend = () => {
    if(!selectedUser) return;
    if (!message.trim()) return;
    onSendMessage(message);
    socket.emit("stopTyping", {
      senderId: currentUser.id,
      receiverId: selectedUser._id,
    });
    clearTimeout(typingTimeoutRef.current);
    setMessage("");
  };

  return (
    <div className="h-20 bg-[#232E3C] border-t border-[#2B5278] px-4 flex items-center gap-3">

      <button  className="px-3 py-3 text-gray-400 rounded-3xl">
        <MdOutlineEmojiEmotions size={23}></MdOutlineEmojiEmotions>
      </button>

      <input type="text" value={message} onChange={(e) => {
        handleTyping(e.target.value)
      }}
        placeholder="Type a message..."
        className="flex-1 px-4 py-3 rounded-full bg-[#17212B] border border-[#2B5278] text-white focus:outline-none focus:border-[#3390EC]"
      />

      <button onClick={handleSend} className="px-4 py-4 bg-[#3390EC] hover:bg-[#2481DB] text-white rounded-3xl">
        <MdSend></MdSend>
      </button>

    </div>
  );
}

export default MessageInput;