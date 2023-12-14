import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NotFound = () => {
  const customize = useSelector((state) => state.customize);
  return (
    <Result
      style={{
        backgroundColor: customize.darkMode ? "bg-darkModeBg" : "bg-white",
      }}
      status="404"
      title="Không tìm thấy trang"
      subTitle="Xin lỗi bạn phải đăng nhập để sử dụng"
      extra={
        <Link to="/">
          <Button type="primary">Back Login</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
