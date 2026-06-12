import { useState,useEffect } from "react"
import { getMessages,logoutUser,sendMessage,} from "../services/authService"
import socket from "../services/socket";


import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageArea from "../components/MessageArea";
import MessageInput from "../components/MessageInput";
import NavigationRail from "../components/NavigationRail";
import ProfilePanel from "../components/ProfilePanel";
import SettingsPanel from "../components/SettingsPanel";


function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [activeSection, setActiveSection] = useState("chats");
  
  //handles Logout
  const handleLogout = () => {logoutUser();navigate("/login");};

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

    //For Adjustable SideBar
    const startResizing = () => {
      document.addEventListener(
        "mousemove",
        resize
      );
  
      document.addEventListener(
        "mouseup",
        stopResizing
      );
    };
  
    //For sesizing Sidebar
    const resize = (e) => {
      setSidebarWidth(
        Math.max(
          250,
          Math.min(600, e.clientX)
        )
      );
    };
  
    const stopResizing = () => {
      document.removeEventListener(
        "mousemove",
        resize
      );
  
      document.removeEventListener(
        "mouseup",
        stopResizing
      );
    };

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected:", socket.id);
        console.log("Current User:", currentUser);
        console.log("Current User ID:", currentUser._id);
        socket.emit("userJoined", currentUser._id);
      });

      return () => {
        socket.off("connect");
      };
    }, []);
  
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
      <NavigationRail 
        activeSection = {activeSection}
        setActiveSection = {setActiveSection}  
      />

      {activeSection === "chats" && (
        <>
          <Sidebar
          
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />

          <div
            onMouseDown={startResizing}
            className="w-1 cursor-col-resize hover:bg-[#3390EC]"
          ></div>

          <div className="flex-1 flex flex-col">
            <ChatHeader selectedUser={selectedUser} />

            <MessageArea
              messages={messages}
              currentUser={currentUser}
            />

            {selectedUser && (
              <MessageInput
                selectedUser={selectedUser}
                onSendMessage={handleSendMessage}
              />
            )}
          </div>
        </>
      )}
      {activeSection === "profile" && (
        <ProfilePanel currentUser={currentUser} />
      )}
      {activeSection === "settings" && (
        <SettingsPanel />
      )}
    </div>
  );
}

export default Chat;