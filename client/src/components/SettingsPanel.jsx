function SettingsPanel() {
  return (
    <div className="flex-1 bg-[#0F1720] flex items-center justify-center">
      <div className="bg-[#1A2530] p-8 rounded-2xl w-[500px]">

        <h2 className="text-white text-2xl font-semibold mb-6">
          Settings
        </h2>

        <div className="space-y-4">

          <button className="w-full text-left bg-[#233040] p-4 rounded-xl text-white">
            Notifications
          </button>

          <button className="w-full text-left bg-[#233040] p-4 rounded-xl text-white">
            Privacy
          </button>

          <button className="w-full text-left bg-[#233040] p-4 rounded-xl text-white">
            Appearance
          </button>

        </div>

      </div>
    </div>
  );
}

export default SettingsPanel;