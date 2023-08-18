
const BookingPage = () => {
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
          CHỌN KHU VỰC
        </h2>
        <button
          type="submit"
          className="w-full sm:w-1/2 p-2 bg-[#F0A500E5] text-white rounded focus:outline-none focus:ring focus:ring-[#F0A500E5]"
        >
          Ngoài trời
        </button>
        <button
          type="submit"
          className="w-full sm:w-1/2 p-2 bg-[#E6D5B8] text-black rounded focus:outline-none focus:ring focus:ring-[#E6D5B8]"
        >
          Phòng riêng
        </button>
        <div
          className="w-full sm:w-1/2"
          style={{ borderTop: "1px dotted white" }}
        ></div>
        <button
          type="submit"
          className="w-full sm:w-1/2 p-2 bg-red-600 text-white rounded focus:outline-none focus:ring focus:ring-red-600"
        >
          Đăng xuất
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
