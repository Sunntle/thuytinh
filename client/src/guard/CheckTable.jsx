import { useLocation } from "react-router-dom";
import SelectTable from "../pages/SelectTable/index.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initTable } from "../redux/CustomerName/customerNameSlice.js";
function CheckTable(props) {
  const location = useLocation();
  let idTable = !location.pathname.includes("undefined") ? location.pathname.split("/")[1].split("-")[1]: undefined // exist  = quet QR // undefined
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initTable())
  },[])
  // eslint-disable-next-line react/prop-types
  return idTable ? (props.children) : (<SelectTable/>)
}

export default CheckTable