export default function RoleSelector({ selectedRole, onChange }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-1">Select Role</p>
      <div className="flex gap-4">
        {["Student", "Employer"].map((role) => (
          <label key={role} className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value={role.toLowerCase()}
              checked={selectedRole === role.toLowerCase()}
              onChange={onChange}
              className="accent-orange-600"
            />
            <span>{role}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
