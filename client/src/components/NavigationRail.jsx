import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


function NavigationRail({activeSection,setActiveSection,}) {
    const navigate = useNavigate();
    const activeClass ="bg-[#3390EC] text-white";
    const inactiveClass ="text-[#AAB2BD] hover:text-white";
    const handleLogout = () => {logoutUser();navigate("/login");};

  return (
    <div className="w-16 bg-[#1A2530] border-r border-[#2B5278] flex flex-col items-center py-4">
      
      <button onClick={() => setActiveSection("chats")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeSection === "chats"? activeClass : inactiveClass}`}>
        💬
        </button>

      <button onClick={() => setActiveSection("profile")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeSection === "profile"? activeClass : inactiveClass}`}>
        👤
      </button>

      <button onClick={() => setActiveSection("settings")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeSection === "settings"? activeClass : inactiveClass}`}>
        ⚙️
      </button>
      <button 
        onClick={handleLogout} 
        className="w-10 h-10 rounded-xl text-red-400 hover:bg-[#2B5278]">
        🚪
        </button>
    </div>
  );
}

export default NavigationRail;