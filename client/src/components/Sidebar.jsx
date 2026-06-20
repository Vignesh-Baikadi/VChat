import { useEffect, useState } from "react";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import ChatItem from "./ChatItem";
import {MdPersonAddAlt} from "react-icons/md";


function Sidebar({users,setUsers,selectedUser,setSelectedUser,sidebarWidth,setSidebarWidth,onlineUsers,typingUsers,}) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  
  //Filters users acc to search keywords
  const filteredUsers = users.filter(
    (user) => user.username.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
    if (!a.lastMessageTime) return 1;
    if (!b.lastMessageTime) return -1;
    return (
      new Date(b.lastMessageTime) -
      new Date(a.lastMessageTime)
    );
  });

  //Handles logout
  const handleLogout = () => {logoutUser();navigate("/login");};

  return (
    <div style={{ width: `${sidebarWidth}px` } } className="bg-[#232E3C] border-r border-[#2B5278] flex flex-col">

      {/* Header of the Sidebar */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-white text-3xl font-semibold">
          VChat
        </h2>

        <div className="flex gap-4">
          <button><MdPersonAddAlt size={20} className="text-gray-400 "></MdPersonAddAlt></button>
          <button>⋮</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text" placeholder="Search chats..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-[#17212B] text-white border border-[#2B5278] focus:outline-none focus:border-[#3390EC]"
        />
      </div>
      
    <div className="flex-1 overflow-y-auto">
      {/* Returns filteredusers acc to keyword */}
      {filteredUsers.map((user) => (
        <ChatItem
          key={user._id}
          user={user}
          onlineUsers = {onlineUsers}
          typingUsers = {typingUsers}
          onClick ={() => setSelectedUser(user)}
          isSelected={selectedUser?._id === user._id}
        />
      ))}

      {/* Returns No Users found if not exist */}
      {filteredUsers.length === 0 && (
        <p className="text-center text-[#AAB2BD] mt-6">
          No users found
        </p>
      )}
    </div>
      
    </div>
    
  );
}

export default Sidebar;