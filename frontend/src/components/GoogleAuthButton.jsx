export default function GoogleAuthButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-lg flex justify-center items-center gap-2 text-gray-700 hover:bg-gray-100"
      >
        <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
        Sign in with Google
      </button>
    );
  }
  