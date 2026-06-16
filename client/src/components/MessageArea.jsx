import { useEffect , useRef } from "react";
import chatbg from "../assets/chat-app-assets/vchat-bg-1.jpg";

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
              className={`px-4 py-2 rounded-2xl max-w-md break-words text-white relative ${
                isMine
                  ? "bg-[#2B5278] rounded-2xl rounded-tr-sm"
                  : "bg-[#232E3C] rounded-2xl rounded-tl-sm"
              }`}
            >
              <div className="flex items-end gap-2">
                <span>
                  {message.content}
                </span>
                <span className=" text-[11px] text-[#AAB2BD] whitespace-nowrap self-end">
                  {new Date( message.createdAt).toLocaleTimeString([], {  hour: "2-digit", minute: "2-digit", })}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageArea;