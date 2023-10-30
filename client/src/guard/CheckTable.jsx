import { useLocation } from "react-router-dom";
import SelectTable from "../pages/SelectTable/index.jsx";
function CheckTable(props) {
  const location = useLocation();
  let idTable = !location.pathname.includes("undefined") ? location.pathname.split("/")[1].split("-")[1]: undefined // exist  = quet QR // undefined
  // eslint-disable-next-line react/prop-types
  return idTable ? (props.children) : (<SelectTable/>)
}

export default CheckTable