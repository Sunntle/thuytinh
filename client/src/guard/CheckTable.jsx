import { useLocation } from "react-router-dom";
import SelectTable from "../pages/SelectTable/index.jsx";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";
import axios from "../utils/axiosConfig.js";

function CheckTable(props) {
  const location = useLocation();
  const [isTableExist, setTableExist] = useState("")
  const [loading, setLoading] = useState(true)
  const tokenTable = localStorage.getItem("tableToken")
  let idTable = !location.pathname.includes("undefined") ? location.pathname.split("/")[1].split("-")[1] : undefined
  useEffect(() => {
    const checkTableExist = async () => {
      setLoading(true)
      try {
        if (idTable) {
          const response = await axios.get(`/table?_id=eq_${idTable}`)
          if (response.length == 0) {
            setTableExist("Không tồn tại bàn này!")
            return
          }
          if (response[0].token == tokenTable) {
            setTableExist("Đúng")
            return
          }
          response[0].token == null ? setTableExist("Bàn đang trống") : setTableExist("Bàn đã được sử dụng")
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
  // eslint-disable-next-line react/prop-types
  return isTableExist == "Đúng" || isTableExist === "Bàn đang trống" ? (props.children) : (<SelectTable isTableExist={isTableExist} />)
}

export default CheckTable