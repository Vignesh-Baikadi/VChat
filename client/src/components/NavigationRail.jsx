import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {MdMessage,MdPerson,MdOutlineLogout,MdOutlineSettings} from "react-icons/md";

function NavigationRail({activeSection,setActiveSection,}) {
    const navigate = useNavigate();
    const activeClass ="bg-[#3390EC] text-white";
    const inactiveClass ="text-[#AAB2BD] hover:text-white";
    const handleLogout = () => {logoutUser();navigate("/login");};

  return (
    <div className="w-15 bg-[#1A2530] border-r border-[#2B5278] gap-3 flex flex-col items-center py-5">
      
      <button onClick={() => setActiveSection("chats")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#2B5278] ${activeSection === "chats"? activeClass :  inactiveClass}`}>
        <MdMessage size={20}></MdMessage>
        </button>

      <button onClick={() => setActiveSection("profile")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#2B5278] ${activeSection === "profile"? activeClass : inactiveClass}`}>
        <MdPerson size={20}></MdPerson>
      </button>

      <button onClick={() => setActiveSection("settings")}
        className={`w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#2B5278] ${activeSection === "settings"? activeClass : inactiveClass}`}>
       <MdOutlineSettings size={20}></MdOutlineSettings>
      </button>
      <button  onClick={handleLogout}  
        className="w-10 h-10 rounded-xl flex items-center justify-center text-red-400 hover:bg-[#2B5278]">
        <MdOutlineLogout size={20}></MdOutlineLogout>
        </button>
    </div>
  );
}

export default NavigationRail;