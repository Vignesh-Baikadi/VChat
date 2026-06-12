function ProfilePanel({ currentUser }) {
  return (
    <div className="flex-1 bg-[#0F1720] flex items-center justify-center">
      <div className="bg-[#1A2530] p-8 rounded-2xl w-[400px] text-center">

        <div className="w-24 h-24 rounded-full bg-[#3390EC] mx-auto flex items-center justify-center text-4xl font-bold text-white">
          {currentUser?.username?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-white text-2xl font-semibold mt-4">
          {currentUser?.username}
        </h2>

        <p className="text-[#AAB2BD] mt-2">
          {currentUser?.email}
        </p>

      </div>
    </div>
  );
}

export default ProfilePanel;