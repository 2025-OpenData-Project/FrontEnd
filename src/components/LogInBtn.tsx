const LogInBtn = () => {
  const handleLogin = () => {};

  return (
    <button
      onClick={() => {
        handleLogin();
      }}
      className="bg-blue-500 text-white max-h-10 px-4 py-2 rounded hover:bg-blue-600"
    >
      Log In
    </button>
  );
};

export default LogInBtn;
