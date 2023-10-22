import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initTable } from "../redux/CustomerName/customerNameSlice.js";
import { useEffect } from "react";
import SelectTable from "../pages/SelectTable/index.jsx";
function CheckTable(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const idTable = location.pathname.split("/")[1].split("-")[1]
  useEffect(()=>{
      if(idTable) dispatch(initTable({tables: [idTable], name: "", timestamp: new Date().valueOf()}))
  },[])
  // eslint-disable-next-line react/prop-types
  return idTable ? (props.children) : (<SelectTable/>)
}

export default CheckTable