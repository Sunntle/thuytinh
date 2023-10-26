import { getPreciseDistance } from "geolib";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { Spin, Tabs } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import DeliveryNotSupported from "../DeliveryNotSupported";

function SelectTable() {
  //token -> checktoken in localStorage -> navigate
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const [distanceState, setDistanceState] = useState(0)
  const { sendRequest, isLoading } = useHttp();
  const customerName = useSelector(state => state.customerName)

  const handleSelectTable = useCallback(async (id) => {
    navigate(`/ban-${id}`);
  }, [navigate]);

  useEffect(() => {
    if (customerName.name.length > 0 && customerName.tables.length > 0) {
      handleSelectTable(customerName.tables[0])
    }
  }, [customerName.name.length, customerName.tables, handleSelectTable])

  useEffect(() => {
    const position1 = {
      latitude: 10.8524972,
      longitude: 106.6259193
    };
    navigator.geolocation.getCurrentPosition(async (position) => {
      const position2 = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log(position2)
      const distance = getPreciseDistance(position1, position2);
      console.log(distance);
      setDistanceState(distance)
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
  if(distanceState > 100 ) return <DeliveryNotSupported/>
  if (isLoading === true) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        {isLoading && <Spin size={"large"} />}
        <span className="mt-5 text-base font-semibold">
          Quý khách vui lòng đợi trong giây lát.
        </span>
      </div>
    );
  }
  return (
    <div className="pb-24 mt-4 lg:mt-0 lg:pt-24">
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
                  <div className="grid grid-cols-2 gap-4">

                    {tableByPosition?.map((table) => (
                      <div key={table.id} onClick={() => handleSelectTable(table.id)} className="w-auto h-44 border-2 border-primary bg-primary/20 rounded-md flex justify-center items-center">
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
