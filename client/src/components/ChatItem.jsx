function ChatItem({ user,onClick,isSelected }) {
  return (
    <div onClick={onClick}
        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-[#2B5278]
        ${isSelected? "bg-[#2B5278]" : "hover:bg-[#17212B]" }`}>

      {/* User avatar */}
      <div className="h-12 w-12 rounded-full bg-[#3390EC] flex items-center justify-center text-white font-semibold">
        {user.username.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <h3 className="text-white font-medium">
          {user.username}
        </h3>

        <p className="text-sm text-[#AAB2BD] truncate">
          {user.email}
        </p>
      </div>

    </div>
  );
}

export default ChatItem;