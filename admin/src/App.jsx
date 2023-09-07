
import { fetchAccount } from "./redux/account/accountSlice";
import { ConfigProvider as ConfigProviderAntd } from "antd";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import router from "./routes";

import { useEffect } from "react";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname !== '/') {
      dispatch(fetchAccount());
    }

  }, [dispatch]);
  return (
    <ConfigProviderAntd
      theme={{
        components: {
          Button: {
            colorPrimary: "#FC8019",
            algorithm: true,
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProviderAntd>
  );
};

export default App;
