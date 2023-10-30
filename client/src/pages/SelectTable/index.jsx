import { getPreciseDistance } from "geolib";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { Spin, Tabs} from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import DeliveryNotSupported from "../DeliveryNotSupported";
import { Spinner } from "../../components/index.js";

function SelectTable() {
  //token -> checktoken in localStorage -> navigate
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const [distanceState, setDistanceState] = useState(0)
  const { sendRequest, isLoading } = useHttp();
  const customerName = useSelector(state => state.customerName)
  const idTable = location.pathname.split("/")[1].split("-")[1]
  const handleSelectTable = useCallback(async (id) => {
    navigate(`/ban-${id}`,{ state: { from: 'menu' }});
  },[navigate]);

  useEffect(() => {
    if (customerName.name.length > 0 && customerName.tables.length > 0) {
      handleSelectTable(customerName.tables[0]);
    }
  }, [customerName.name.length, customerName.tables, handleSelectTable]);

  useEffect(() => {
    const position1 = {
      latitude: 10.8524972,
      longitude: 106.6259193,
    };
    navigator.geolocation.getCurrentPosition(async (position) => {
      const position2 = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const distance = getPreciseDistance(position1, position2);
      setDistanceState(distance);
      await sendRequest(
        { method: "get", url: "/table?_status_table=eq_0" },
        setTables,
      );
    });
  }, [sendRequest]);
  
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
  // if(distanceState > 100 ) return <DeliveryNotSupported/>
  if (isLoading) return <Spinner />;

  return (
    <div className="pb-24">
      {idTable &&
        idTable !== customerName.tables?.at(1) &&
        (<p className="-3 text-center">Bàn này đã được sử dụng vui lòng chọn bàn khác nhé!</p>)}
      <div className="w-full h-12 uppercase font-semibold text-lg text-white bg-primary flex justify-center items-center">
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

export default SelectTable;
