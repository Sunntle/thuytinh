import { getPreciseDistance } from "geolib";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { Tabs } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import DeliveryNotSupported from "../DeliveryNotSupported";
import { Spinner } from "../../components/index.js";

function SelectTable() {
  //token -> checktoken in localStorage -> navigate
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const [distanceState, setDistanceState] = useState(0);
  const { sendRequest, isLoading } = useHttp();
  const customerName = useSelector((state) => state.customerName);

  const handleSelectTable = useCallback(
    async (id) => {
      navigate(`/ban-${id}`);
    },
    [navigate],
  );

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
      console.log(position2);
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

  if (distanceState > 100) return <DeliveryNotSupported />;
  if (isLoading === true) return <Spinner />;

  return (
    <div className="min-h-screen min-w-0 background-hero">
      <div className="relative text-center bg-primary text-white text-lg py-3 mb-4">
        CHỌN BÀN
      </div>
      <div className="relative px-6 xl:px-12">
        <Tabs
          type={"line"}
          onChange={onHandleTabChange}
          defaultActiveKey={"in"}
          centered
          items={["in", "out"].map((position) => {
            return {
              label:
                position === "in" ? (
                  <span className="text-base md:text-lg lg:text-xl font-semibold">
                    Ngoài trời
                  </span>
                ) : (
                  <span className="text-base md:text-lg lg:text-xl font-semibold">
                    Trong nhà
                  </span>
                ),
              key: position,
              children: (
                <div className="w-full min-h-0 max-w-full">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {tableByPosition?.map((table) => (
                      <div
                        key={table.id}
                        onClick={() => handleSelectTable(table.id)}
                        className="text-white w-auto h-44 bg-primary/70 border border-white/50 rounded-md flex justify-center items-center shadow-primary shadow-md"
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
