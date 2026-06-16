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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  
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

    //for Socket id printing in the console and terminal
    useEffect(() => {
      // socket.connect();
        socket.emit(
        "userJoined",
        currentUser.id
      );

    }, [currentUser]);

    //For real time messages
    useEffect(() => {
      socket.on("newMessage", (message) => {
        console.log(
          "Real-time message received:",
          message
        );
        setMessages((prev) => [
          ...prev,
          message,
        ]);

      });
      return () => {
        socket.off("newMessage");
      };
    }, []);


    //For indication for users online or offline
    useEffect(() => {
      socket.on(
        "onlineUsers",
        (users) => {
          console.log(
            "Online Users:",
            users
          );
          setOnlineUsers(users);
        }
      );

      return () => {
        socket.off("onlineUsers");
      };

    }, []);
  

    // Listen for typing events from other users
    useEffect(() => {
      socket.on("typing", (senderId) => {
        setTypingUsers((prev) => {
          if (prev.includes(senderId))
            return prev;
          return [...prev, senderId];
        });

      });

      socket.on(
        "stopTyping",
        (senderId) => {
          setTypingUsers((prev) =>
            prev.filter(
              (id) => id !== senderId
            )
          );

        }
      );
      return () => {
        socket.off("typing");
        socket.off("stopTyping");
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
            onlineUsers = {onlineUsers}
            typingUsers = {typingUsers}
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
            {selectedUser ? (
              <>
                <ChatHeader selectedUser={selectedUser}/>
                <MessageArea
                  messages={messages}
                  currentUser={currentUser}
                />

                <MessageInput
                  selectedUser={selectedUser}
                  onSendMessage={handleSendMessage}
                />
              </>

            ) : (

              <div className=" flex-1 flex flex-col items-center justify-center bg-[#18212B] text-[#AAB2BD]">
                <h1 className="text-4xl font-light mb-4">
                  VChat
                </h1>
                <p className="text-m">
                  Select a chat to start messaging
                </p>
              </div>
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