import { getPreciseDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import {Spin, Tabs} from "antd";
import "./index.css";

function SelectTable() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const { sendRequest, isLoading } = useHttp();
  //test
  useEffect(() => {
    const position1 = {
      latitude: 10.779984,
      longitude: 106.675157,
    };
    navigator.geolocation.getCurrentPosition(async (position) => {
      const position2 = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const distance = getPreciseDistance(position1, position2);
      console.log(distance);
      await sendRequest(
        { method: "get", url: "/table?_status_table=eq_0" },
        setTables,
      );
    });
  }, [sendRequest]);

  const handleSelectTable = async (id) => {
    navigate(`/ban-${id}`);
  };

  useEffect(() => {
    if (tables !== null) {
      const filteredValue = tables?.filter((table) => table.position === "in");
      setTableByPosition(filteredValue);
    }
  }, [tables]);

  const onHandleTabChange = (key) => {
    const filteredValue = tables?.filter((table) => table.position === key);
    setTableByPosition(filteredValue);
    console.log(tableByPosition);
  };

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
          items={["in", "out"].map((position,index) => {
            return {
              label: position === "in" ? "Ngoài trời" : "Trong nhà",
              key: index,
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
