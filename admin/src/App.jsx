import { ConfigProvider as ConfigProviderAntd, theme } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import Spinner from "./components/spinner";
import { fetchAccount } from "./redux/account/accountSlice";
import router from "./routes";
import { socket } from "./socket";
import { fetchNotification } from "./redux/notification/notificationSystem";
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Bangkok');
const nextCallAccount = ['/', '/register'];
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const customize = useSelector(state => state.customize)

  useEffect(() => {
    if (!nextCallAccount.includes(window.location.pathname)) {
      dispatch(fetchAccount());
    }
    dispatch(fetchNotification())
  }, [dispatch]);

  useEffect(() => {
    if (user.isAuthenticated) {
      socket.emit("user-connected", user.user)
    }
  }, [user.isAuthenticated, user.user])
  if (user && user.isLoading) return <Spinner />
  return (
    <ConfigProviderAntd
      theme={{
        algorithm: customize.darkMode ? darkAlgorithm : defaultAlgorithm,
        components: {
          Button: {
            colorPrimary: "#FC8019",
            algorithm: true,
          },
          Pagination: {
            itemActiveBg: "#FC8019",
            colorPrimary: "#fff",
            colorPrimaryBorder: "#fd9c4b",
            colorPrimaryHover: "#fd9c4b",
            colorBgTextHover: "#FC8019",
            colorBgTextActive: "#fff",
            colorText: "#7e808c",
          },

          Menu: {
            itemSelectedColor: "#FFFFFF",
            itemSelectedBg: "#FC8019",
            darkItemSelectedBg: "#FC8019",
            darkSubMenuItemBg: "#001529"
          },
          Layout: {
            lightSiderBg: "#FC8019",
            triggerBg: "#000000",
            siderBg: "#FC8019",
          },
          Tabs: {
            inkBarColor: "#FC8019",
            itemSelectedColor: "#FC8019",
            itemHoverColor: "#FC8019",
            itemActiveColor: "#7e808c",
            titleFontSizeLG: 18
          },
        },

      }

      }
    >
      <RouterProvider router={router} />
    </ConfigProviderAntd>
  );
};

export default App;
