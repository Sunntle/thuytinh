import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const customize = useSelector((state) => state.customize);
  const navigate = useNavigate();
  return (
    <Result
      style={{
        backgroundColor: customize.darkMode ? "bg-darkModeBg" : "bg-white",
      }}
      status="404"
      title="Bạn không có quyền truy cập"
      subTitle="Cần quyền admin để vào đường dẫn này"
      extra={
        <>
          <Button type="primary" onClick={() => navigate("/")}>
            Trang chủ
          </Button>{" "}
          <Button type="primary" onClick={() => navigate("/")}>
            Đăng nhập
          </Button>
        </>
      }
    />
  );
};

export default Unauthorized;
