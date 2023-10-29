
import { Link } from "react-router-dom";

const DeliveryNotSupported = () => {

  return (
    <div className="flex h-screen w-screen justify-center items-center text-slate-800">
      <div className="flex flex-col justify-center items-center space-y-6">
        <dotlottie-player src="https://lottie.host/c688f3e8-86d2-4cfd-b541-1bac8affa464/a5muuEQ5WM.json" speed="1" style={{width: '100%', height: '300px'}} direction="1" mode="normal" loop autoplay></dotlottie-player>
        <span className="font-bold">Bạn ở quá xa, chức năng vận chuyển đang được phát triển</span>
        <Link
          to="/home"
          className="w-full border rounded-lg bg-primary text-white text-center p-3 font-semibold"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default DeliveryNotSupported;
