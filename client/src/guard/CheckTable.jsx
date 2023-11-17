import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner.jsx";
import axios from "../utils/axiosConfig.js";

const exampleStringTableExist = [
  "Không tồn tại bàn này!", "Đúng", "Kích hoạt bàn đặt trước", "Bàn đang trống", "Bàn đã được sử dụng"
]
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
          const currentTime = new Date()
          const response = await axios.get(`/table/${idTable}`)
          // invalid table
          if (response.success == false && response.message) {
            setTableExist(exampleStringTableExist[0])
            return
          }
          // check ban` hien tai
          if (response.token == tokenTable && tokenTable && tokenTable != null) {
            setTableExist(exampleStringTableExist[1])
            return
          }
          // ban da duoc dat truoc
          if(response.success == false && response.data && currentTime.valueOf() > response.prevTime.valueOf() && currentTime.valueOf() < response.nextTime.valueOf()){
            setTableExist(exampleStringTableExist[2])
            return
          }
          //ban trong
          (response?.token == null || response?.token == '') && response.status_table == 0 ? setTableExist(exampleStringTableExist[3]) : setTableExist(exampleStringTableExist[4])
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
  if(isTableExist == isTableExist[2]) return <Navigate to="/active-booking" replace/>
    // eslint-disable-next-line react/prop-types
  return isTableExist == isTableExist[1] || isTableExist == isTableExist[3] ? (props.children) : (<Navigate to={"/select-table"} state={{isTableExist, ...(idTable ? {prevTable: idTable}: {}) }} replace/>)

}

export default CheckTable