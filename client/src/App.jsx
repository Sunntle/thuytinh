import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { initTable } from "./redux/CustomerName/customerNameSlice";
import { useDispatch } from "react-redux";
import { ConfigProvider as ConfigProviderAntd } from "antd";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initTable());
  }, [dispatch]);

  return (
    <ConfigProviderAntd
      theme={{
        components: {
          Form: {
              itemMarginBottom: 0,
              algorithm: true
          }
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProviderAntd>
  );
};

export default App;
