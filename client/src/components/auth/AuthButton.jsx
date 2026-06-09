function AuthButton({ text }) {
  return (
    <button
      className="
        w-full
        bg-green-500
        text-white
        p-3
        rounded-lg
        hover:bg-green-600
      "
    >
      {text}
    </button>
  );
}

export default AuthButton;