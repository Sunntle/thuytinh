import { useLocation } from "react-router-dom";
import SelectTable from "../pages/SelectTable/index.jsx";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import axios from "../utils/axiosConfig.js";

function CheckTable(props) {
  const location = useLocation();
  const [isTableExist, setTableExist] = useState(false)
  const [loading, setLoading] = useState(true)
  const tokenTable = localStorage.getItem("tableToken")
  let idTable = !location.pathname.includes("undefined") ? location.pathname.split("/")[1].split("-")[1]: undefined // exist  = quet QR // undefined
  useEffect(()=>{
    const checkTableExist = async()=>{
      setLoading(true)
      try{
        if(idTable){
          const response = await axios.get(`/table?_id=eq_${idTable}`)
          if(response.length == 0)  {
            setTableExist(false)
            return
          }
          if(response[0].token == tokenTable) {
            setTableExist(true)
            return
          }
          setTableExist(false)
        }
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false)
      }
    }
    checkTableExist()
  },[idTable, tokenTable])
  if(loading) return <Spinner/>
  // eslint-disable-next-line react/prop-types
  return isTableExist ? (props.children) : (<SelectTable/>)
}

export default CheckTable