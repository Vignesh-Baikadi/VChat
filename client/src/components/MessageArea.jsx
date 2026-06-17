import React,{ useEffect , useRef } from "react";
import chatbg from "../assets/chat-app-assets/vchat-bg-1.jpg";
import formatChatDate from "../utils/formatChatDate";


function MessageArea({messages,currentUser,}) {
  const bottomRef = useRef(null);

  //For auto scroll to new messages 
  useEffect(() => {
    bottomRef.current ?.scrollIntoView({
      behavior : "smooth",
    });
  },[messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#18212B]" style={{
    backgroundImage: `url(${chatbg})`,
    backgroundPosition : "center",
    backgroundSize: "600px",
  }}
    >
      {messages.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-[#AAB2BD]">
            No messages yet
          </p>
        </div>
      )}
     {messages.map((message,index) => {
        const previousMessage = messages[index-1];
        const currentDate = new Date(message.createdAt).toDateString();
        const previousDate = previousMessage ? new Date(previousMessage.createdAt).toDateString() : null;
        const showDateSeparator = currentDate !== previousDate; 
        const isMine =  message.sender.toString() === currentUser.id;
        return (
        <React.Fragment key={message._id}>
        {showDateSeparator && (
          <div className="flex justify-center my-4">
            <div className="bg-[#202C33] text-[#AAB2BD] text-xs px-3 py-1 rounded-lg shadow-sm">
              {formatChatDate(message.createdAt)}
            </div>
          </div>
        )}
          <div key={message._id} className={`flex mb-1.5 ${isMine ? "justify-end": "justify-start" }`}>
            <div
              className={`px-4 py-2 rounded-2xl max-w-[65%] break-words text-white relative ${
                isMine
                  ? "bg-[#2B5278] rounded-2xl rounded-tr-sm"
                  : "bg-[#232E3C] rounded-2xl rounded-tl-sm"
              }`}
            >
              <div >
                <p className="break-words">
                  {message.content}
                </p>
                <div className=" flex justify-end items-center gap-1 mt-1 text-[11px] text-[#AAB2BD]">
                  <span>
                      {new Date( message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",})}
                  </span>
                  {isMine && (
                    <span  className="text-[10px]">
                          ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
        );
      })}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageArea;