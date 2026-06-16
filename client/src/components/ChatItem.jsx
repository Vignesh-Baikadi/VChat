import formatMessageTime from "../utils/formatMessageTIme";

function ChatItem({ user,onClick,isSelected,onlineUsers,typingUsers,}) {

  const isOnline =  onlineUsers.includes(user._id);
  const isTyping = typingUsers.includes(user._id);
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
            {formatMessageTime(
              user.lastMessageTime
            )}
          </span>
        </div>

        {/* Last Message */}
        <p className={`text-sm truncate ${ isTyping ? "text-green-400" : "text-[#AAB2BD]" }`}>
          {isTyping ? "typing..." : user.lastMessage}
        </p>

      </div>

    </div>
  );
}

export default ChatItem;