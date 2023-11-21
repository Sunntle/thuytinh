import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { initTable, resetTablesStore } from "./redux/CustomerName/customerNameSlice";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider as ConfigProviderAntd } from "antd";
import { socket } from "./services/socket";
import { resetOrderStore } from "./redux/Order/orderSlice";
const App = () => {
  const dispatch = useDispatch();
  const customerName = useSelector(state => state.customerName)
  useEffect(() => {
    dispatch(initTable());
  }, [dispatch]);

  useEffect(() => {
    if (customerName.tables.length > 0) {
      socket.on("complete-payment", ({ data }) => {
        if (customerName.tables[0] == data) {
          dispatch(resetOrderStore())
          dispatch(resetTablesStore())
        }
        window.location.href =  import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_CLIENT_URL_PRODUCTION : import.meta.env.VITE_APP_CLIENT_URL;
      })
    }
  }, [customerName.tables]);

  return (
    <ConfigProviderAntd
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
            algorithm: true
          },
          Button: {
            colorWhite: "#323232",
            colorPrimaryHover: "#ffffff",
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
