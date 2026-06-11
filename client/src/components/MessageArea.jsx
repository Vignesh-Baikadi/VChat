function MessageArea({messages,currentUser}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#17212B]" style={{
        backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
    }}
    >
      {messages.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-[#AAB2BD]">
            No messages yet
          </p>
        </div>
      )}
     {messages.map((message) => {
        const isMine =  message.sender.toString() === currentUser.id;
        return (
          <div
            key={message._id}
            className={`flex mb-4 ${
              isMine
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-md break-words text-white ${
                isMine
                  ? "bg-[#2B5278]"
                  : "bg-[#232E3C]"
              }`}
            >
              {message.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageArea;