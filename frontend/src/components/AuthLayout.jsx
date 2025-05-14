export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6 p-6 bg-white shadow-lg rounded-xl">
          {children}
        </div>
      </div>
    );
  }
  