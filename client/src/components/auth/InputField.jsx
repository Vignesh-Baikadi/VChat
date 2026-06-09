function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          border
          border-gray-300
          rounded-xl
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
          transition
        "
      />
    </div>
  );
}

export default InputField;