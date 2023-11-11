import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGooglePlus } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="relative max-w-full w-screen h-screen mx-auto p-6 lg:p-16">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          loading={"lazy"}
          src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1699338069/NhaHangThuyTinh/nvspywoqvgdkishqy0cn.webp"
          alt=""
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="h-full grid lg:grid-cols-3 border rounded-2xl shadow-md bg-white overflow-hidden"
      >
        <div className="lg:col-span-1 relative flex flex-col items-center justify-between px-2 pt-20 pb-10 text-slate-500 ">
          <div className="absolute top-4 right-0 min-w-fit h-10 px-2 py-1 rounded-l-2xl bg-primary flex justify-center items-center text-white text-sm">
            Chào mừng bạn quay trở lại
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="block text-xl font-semibold uppercase">
              Đăng nhập
            </span>
            <div className="text-xs mt-1">
              Đăng nhập tài khoản để sử dụng dịch vụ
            </div>
          </div>
          <form className="w-full flex flex-col items-center justify-center space-y-4">
            <div className="w-9/12 flex flex-col">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 bg-slate-100 text-sm outline-none py-2 pl-1 rounded focus:outline-primary transition-all duration-200"
              />
            </div>
            <div className="w-9/12 flex flex-col">
              <label htmlFor="password" className="text-sm">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-2 bg-slate-100 text-sm outline-none py-2 pl-1 rounded focus:outline-primary transition-all duration-200"
              />
            </div>
            <div className="w-9/12 flex justify-between items-center">
              <div className="flex justify-between items-center space-x-1">
                <input
                  type="checkbox"
                  className="relative appearance-none peer  w-4 h-4 rounded-sm border-2 checked:bg-primary"
                />
                <span className="text-sm">Nhớ mật khẩu</span>
              </div>
              <span className="text-primary underline text-sm">
                Quên mật khẩu
              </span>
            </div>
          </form>
          <div className="flex flex-col w-9/12 items-center">
            <button className="box-border border border-transparent w-full py-2 bg-primary rounded text-white transition-all duration-200 active:bg-white active:border active:border-primary active:text-primary hover:bg-white hover:border hover:border-primary hover:text-primary">
              Đăng Ký
            </button>
            <div className="mt-4 flex justify-between items-center w-full">
              <span className="h-0.5 w-full bg-slate-500"></span>
              <span className="px-4">Hoặc</span>
              <span className="h-0.5 w-full bg-slate-500"></span>
            </div>
            <div className="mt-4 flex justify-between items-center w-full">
              <button className="pl-3 box-border flex justify-start items-center space-x-3 border border-transparent w-full py-2 bg-[#c04f3e] rounded text-white transition-all duration-200 active:bg-white active:border active:border-[#c04f3e] active:text-[#c04f3e] hover:bg-white hover:border hover:border-[#c04f3e] hover:text-[#c04f3e]">
                <FaGooglePlus size={20} />
                <span>Đăng nhập bằng Google</span>
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center w-full">
              <button className="pl-3 box-border flex justify-start items-center space-x-3 border border-transparent w-full py-2 bg-[#4267B2] rounded text-white transition-all duration-200 active:bg-white active:border active:border-[#4267B2] active:text-[#4267B2] hover:bg-white hover:border hover:border-[#4267B2] hover:text-[#4267B2]">
                <FaFacebook size={20} />
                <span>Đăng nhập bằng Google</span>
              </button>
            </div>

            <span
              onClick={() => navigate("/sign-up")}
              className="mt-3 text-primary cursor-pointer hover:text-primary/80 transition-colors duration-200"
            >
              Đăng ký tại đây
            </span>
          </div>
        </div>
        <div className="hidden lg:col-span-2 w-full h-full overflow-hidden border-l lg:flex justify-center items-center bg-primary/30 rounded-r-2xl">
          <div className="w-[450px] h-[450px]">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dw6jih4yt/image/upload/v1699338151/NhaHangThuyTinh/wjk8d9pktxryjjdw87xq.webp"
              loading={"lazy"}
              alt=""
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
