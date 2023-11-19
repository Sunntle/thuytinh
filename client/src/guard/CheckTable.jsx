import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner.jsx";
import axios from "../utils/axiosConfig.js";

const currentTime = new Date().valueOf()

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
          const response = await axios.get(`/table/${idTable}?token=${tokenTable}`);
          console.log(response, tokenTable)
          if (response.success == false) {
            if (response.message) {
              setTableExist("Không tồn tại bàn này!")
              return
            }
            if (currentTime > new Date(response.prevTime).valueOf() && currentTime.valueOf() < new Date(response.nextTime).valueOf()) {
              setTableExist("Kích hoạt bàn")
              return
            }
          }
          if (response.success == true) {
            const { token, status_table } = response.data[0]
            if (token == tokenTable && tokenTable && tokenTable != null) {
              setTableExist("Đúng")
              return
            } else {
              (token == null || token == '') && status_table == 0 ? setTableExist("Bàn đang trống") : setTableExist("Bàn đã được sử dụng")
              return
            }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    checkTableExist()
  }, [idTable, tokenTable])
  console.log(isTableExist);
  if (loading) return <Spinner />
  if (isTableExist == "Kích hoạt bàn") return <Navigate to="/active-booking" replace />
  // eslint-disable-next-line react/prop-types
  return isTableExist == "Đúng" || isTableExist == "Bàn đang trống" ? (props.children) : (<Navigate to={"/select-table"} state={{ isTableExist, ...(idTable ? { prevTable: idTable } : {}) }} replace />)

}

export default CheckTable