import {RouterProvider} from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { initTable } from "./redux/CustomerName/customerNameSlice";
import { useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initTable())
  },[])
  return <RouterProvider router={router} />;
};

export default App;
