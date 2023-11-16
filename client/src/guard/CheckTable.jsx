import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner.jsx";
import axios from "../utils/axiosConfig.js";

function CheckTable(props) {
  const location = useLocation();
  const [isTableExist, setTableExist] = useState("")
  const [loading, setLoading] = useState(true)
  const tokenTable = localStorage.getItem("tableToken")
  const idTable = !location.pathname.includes("undefined") ? location.pathname.split("/")[1].split("-")[1] : undefined
  useEffect(() => {
    const checkTableExist = async () => {
      setLoading(true)
      try {
        if (idTable) {
       
          const response = await Promise.all(await axios.get(`/table?_id=eq_${idTable}`)) 
          console.log(response, idTable, tokenTable);// 2, 2, null
          if (response.length == 0) {
            setTableExist("Không tồn tại bàn này!")
            return
          }
          if (response[0].token == tokenTable && tokenTable && tokenTable != null) {
            setTableExist("Đúng")
            return
          }
          (response[0].token == null || response[0]?.token == '') && response[0].status_table == 0 ? setTableExist("Bàn đang trống") : setTableExist("Bàn đã được sử dụng")
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    checkTableExist()
  }, [idTable, tokenTable])
  if (loading) return <Spinner />
  console.log(isTableExist);
    // eslint-disable-next-line react/prop-types
  return isTableExist == "Đúng" || isTableExist == "Bàn đang trống" ? (props.children) : (<Navigate to={"/select-table"} state={{isTableExist, ...(idTable ? {prevTable: idTable}: {}) }} replace/>)
}

export default CheckTable