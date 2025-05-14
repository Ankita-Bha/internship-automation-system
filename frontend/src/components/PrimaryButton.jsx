const PrimaryButton = ({ text, onClick }) => (
    <button
      onClick={onClick}
      className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
    >
      {text}
    </button>
  );
  
  export default PrimaryButton;
  