import { getPreciseDistance } from "geolib";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { Tabs } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/index.js";
import PropTypes from 'prop-types';
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation."

    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable."

    case error.TIMEOUT:
      return "The request to get user location timed out."

    case error.UNKNOWN_ERROR:
      return "An unknown error occurred."

  }
}
function SelectTable() {
  //token -> checktoken in localStorage -> navigate
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const { sendRequest, isLoading } = useHttp();
  const location = useLocation()
  const customerName = useSelector(state => state.customerName)
  const isTableExist = location.state?.isTableExist//ban dang duoc su dung
  const idTable = location.state?.prevTable//1
  const handleSelectTable = useCallback(async (id) => {
    navigate(`/tables-${id}`, { state: { from: 'menu' } });
  }, [navigate]);

  useEffect(() => {
    if (customerName.name.length > 0 && customerName.tables.length > 0 && isTableExist !== "Bàn đã được sử dụng") {
      handleSelectTable(customerName.tables[0]);
    }
  }, [customerName.name.length, customerName.tables, handleSelectTable, isTableExist]);

  useEffect(() => {
    const position1 = {
      latitude: 10.8524972,
      longitude: 106.6259193,
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const position2 = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const distance = getPreciseDistance(position1, position2);
        // if(distance > 1000 ) return navigate("/book-table")
        await sendRequest(
          { method: "get", url: "/table?_status_table=eq_0" },
          setTables
        );
      }, showError);
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  }, [navigate, sendRequest]);

  useEffect(() => {
    if (tables && tables.length > 0) {
      const filteredValue = tables.filter((table) => table.position === "in");
      setTableByPosition(filteredValue);
    }
  }, [tables]);

  const onHandleTabChange = (key) => {
    const filteredValue = tables?.filter((table) => table.position === key);
    setTableByPosition(filteredValue);
  };

  if (isTableExist == "Không tồn tại bàn này!") return <h2 className="py-5 mt-[80px] text-center">{isTableExist}</h2>
  if (isLoading) return <Spinner />;

  return (
    <div className="pb-24 mt-[80px]">
      {idTable && isTableExist == "Bàn đã được sử dụng" &&// 1 == 1
        +idTable !== customerName.tables?.at(1) &&
        (<p className="py-3 text-center">Bàn này đã được sử dụng vui lòng chọn bàn khác nhé!</p>)}
      <div className="w-full h-12 uppercase font-semibold pt-3 text-xl text-primary flex justify-center items-center">
        Chọn bàn
      </div>
      <div className="bg-white px-6 xl:px-12">
        <Tabs
          type={"line"}
          onChange={onHandleTabChange}
          defaultActiveKey={"in"}
          centered
          items={["in", "out"].map((position) => {
            return {
              label: position === "in" ? "Ngoài trời" : "Trong nhà",
              key: position,
              children: (
                <div className="w-full h-screen max-w-full">
                  <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {tableByPosition?.map((table) => (
                      <div
                        key={table.id}
                        onClick={() => handleSelectTable(table.id)}
                        className="cursor-pointer w-auto h-44 border-2 border-primary bg-primary/20 rounded-md flex justify-center items-center"
                      >
                        {table.name_table}
                      </div>
                    ))}
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
}
SelectTable.propTypes = {
  isTableExist: PropTypes.string
}
export default SelectTable;