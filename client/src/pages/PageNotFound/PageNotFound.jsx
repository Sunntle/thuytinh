import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center text-slate-800">
      <div className="flex flex-col justify-center items-center space-y-6">
        <span className="block text-8xl text-primary">404</span>
        <span>Trang này không tồn tại</span>
        <Link
            to={'/home'}
            className="border rounded-lg bg-primary text-white p-3 font-semibold"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
