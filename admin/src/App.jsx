import { ConfigProvider as ConfigProviderAntd } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./app.scss";
import Spinner from "./components/spinner";
import { fetchAccount } from "./redux/account/accountSlice";
import router from "./routes";
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account);
  useEffect(() => {
    if (window.location.pathname !== "/") {
      dispatch(fetchAccount());
    }
  }, [dispatch]);
  if (user && user.isLoading) {
    return <Spinner />;
  }
  return (
    <ConfigProviderAntd
      theme={{
        components: {
          Button: {
            colorPrimary: "#FC8019",
            algorithm: true,
          },
          Pagination: {
            itemActiveBg: "#FC8019",
            colorPrimary: "#fff",
            colorPrimaryBorder: "#fd9c4b",
            colorPrimaryHover: "fd9c4b",
            colorBgTextHover: "#FC8019",
            colorBgTextActive: "#fff",
            colorText: "#7e808c",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProviderAntd>
  );
};

export default App;
