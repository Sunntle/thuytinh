
const LoginPage = () => {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-gray-300"
      style={{
        backgroundImage:
          'url("https://static.thehoneycombers.com/wp-content/uploads/sites/2/2022/03/sydney-restaurants-woodcut-900x643.png")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <form className="z-10 space-y-6 flex flex-col justify-center items-center w-2/3 h-[50vh] p-6 bg-transparent shadow-md sm:w-1/2 sm:bg-white sm:bg-opacity-25">
        <h2 className="text-center text-2xl font-medium text-white mb-4">
          ĐĂNG NHẬP
        </h2>
        <div className="w-full sm:w-1/2 relative border border-gray-300 rounded focus-within:border-orange-500">
          <input
            type="text"
            name="username"
            className="w-full text-sm p-2 focus:outline-none rounded focus:border-orange-500 bg-gray-100"
            placeholder="Tài khoản"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
            <i className="fas fa-user"></i>
          </span>
        </div>
        <div className="w-full sm:w-1/2 relative border border-gray-300 rounded focus-within:border-orange-500">
          <input
            type="password"
            name="password"
            className="w-full text-sm p-2 focus:outline-none rounded focus:border-orange-500 bg-gray-100"
            placeholder="Mật khẩu"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
            <i className="fas fa-lock"></i>
          </span>
        </div>
        <button
          type="submit"
          className="hover:bg-[#F0A500E5] transition-colors duration-300 w-full sm:w-1/2 p-2 bg-orange-500 text-white rounded focus:outline-none focus:ring focus:ring-orange-500"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
