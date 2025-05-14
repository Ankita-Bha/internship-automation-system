export default function AuthInputField({ label, name, type = "text", value, onChange }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
    );
  }
  