import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./app.scss";
import { ConfigProvider as ConfigProviderAntd } from 'antd';
const App = () => {
  return (<ConfigProviderAntd theme={{
    components: {
      Button: {
        colorPrimary: '#FC8019',
        algorithm: true,
      }
    },
  }}>
    <RouterProvider router={router} />
  </ConfigProviderAntd>);
};

export default App;
