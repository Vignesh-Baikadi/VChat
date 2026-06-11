function ChatHeader({selectedUser}) {
  const name = selectedUser?.username || "Select a User";
  return (
    
    <div className="h-18 bg-[#232E3C] border-b border-[#2B5278] px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#3390EC] flex items-center justify-center text-white font-semibold">
          {selectedUser ? selectedUser.username.charAt(0).toUpperCase(): "?"}
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold">
            {name}
          </h2>
          <p className="text-[#AAB2BD] text-sm">
            { selectedUser ? selectedUser.email : "Select a chat" }
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-[#AAB2BD] hover:text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.4 5.4a7.5 7.5 0 0 0 11.25 11.25Z"
            />
          </svg>
        </button>

        <button className="text-[#AAB2BD] hover:text-white text-xl">
          ⋮
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;