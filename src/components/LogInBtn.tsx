const LogInBtn = () => {
  const handleLogin = () => {
    // 로그인 처리 로직
    window.location.href =
      "https://api.yourse-seoul.com/oauth2/authorization/google?redirect_uri=https://yourse-seoul.com";
  };

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
