function ChatItem({ user,onClick,isSelected,onlineUsers,}) {

  const isOnline =  onlineUsers.includes(user._id);

  return (
    <div onClick={onClick}
        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-[#2B5278]
        ${isSelected? "bg-[#2B5278]" : "hover:bg-[#17212B]" }`}>

      {/* User avatar */}
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-[#3390EC] flex items-center justify-center text-white font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>

        {isOnline && (
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-[#232E3C]" />
        )}
      </div>


      {/* User details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium truncate">
            {user.username}
          </h3>

          {/* Last msg time */}
          <span className="text-xs text-[#AAB2BD]">
            {user.lastMessageTime
              ? new Date(
                  user.lastMessageTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>

        {/* Last Message */}
        <p className="text-sm text-[#AAB2BD] truncate">
          {user.lastMessage}
        </p>

      </div>

    </div>
  );
}

export default ChatItem;