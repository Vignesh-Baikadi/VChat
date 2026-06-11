import { useState,useEffect } from "react"
import { getMessages,sendMessage,} from "../services/authService"

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageArea from "../components/MessageArea";
import MessageInput from "../components/MessageInput";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // handles the message send by the user
  const handleSendMessage = async (content) => {
    if (!selectedUser) return;
    try {
      await sendMessage(
        selectedUser._id,
        content
      );

      const data = await getMessages(
        selectedUser._id
      );

      setMessages(data.messages);

    } catch (error) {
      console.error(error);
    }
  }; 
  
  // fetches messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const data = await getMessages(
          selectedUser._id
        );

        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [selectedUser]);


  return (
    <div className="h-screen bg-[#17212B] flex overflow-hidden">
      <Sidebar 
        selectedUser={selectedUser} 
        setSelectedUser={setSelectedUser}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader selectedUser={selectedUser} />
        <MessageArea 
          messages = {messages} 
          currentUser = {currentUser}
        />
        {selectedUser && (
          <MessageInput
            selectedUser={selectedUser}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;