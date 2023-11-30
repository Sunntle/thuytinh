
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { Button, Tabs, message } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/index.js";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { ScrollToTop } from "../../utils/format.js";

const Map = lazy(()=> import("./MapComponent.jsx"))
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message.open({ type: "error", content: "User denied the request for Geolocation." })
      console.log("User denied the request for Geolocation.");
      return "User denied the request for Geolocation.";

    case error.POSITION_UNAVAILABLE:
      message.open({ type: "error", content: "Location information is unavailable." })
      console.log("Location information is unavailable.");
      return "Location information is unavailable.";

    case error.TIMEOUT:
      message.open({ type: "error", content: "The request to get user location timed out." })
      console.log("The request to get user location timed out.");
      return "The request to get user location timed out.";

    case error.UNKNOWN_ERROR:
      message.open({ type: "error", content: "An unknown error occurred." })
      console.log("An unknown error occurred.");
      return "An unknown error occurred.";
  }

}

function SelectTable() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const [position, setPosition] = useState(null);
  const [showMap, setShowMap] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { sendRequest, isLoading } = useHttp();
  const location = useLocation();
  const customerName = useSelector((state) => state.customerName);
  const isTableExist = location.state?.isTableExist; //ban dang duoc su dung
  const idTable = location.state?.prevTable; //1
  const mapRef = useRef(null)

  const handleSelectTable = useCallback(
    async (id) => {
      navigate(`/tables-${id}`, { state: { from: "menu" } });
    },
    [navigate],
  );
  useEffect(() => {
    if (
      customerName.name.length > 0 &&
      customerName.tables.length > 0 &&
      isTableExist !== "Bàn đã được sử dụng"
    ) {
      handleSelectTable(customerName.tables[0]);
    }
  }, [
    customerName.name.length,
    customerName.tables,
    handleSelectTable,
    isTableExist,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      setPosition({ lat: location.coords.latitude, lng: location.coords.longitude })
    }, showError)
    const handleFetchData = async () => {
      await sendRequest(
        { method: "get", url: "/table?_status_table=eq_0" },
        setTables,
      );
    }
    handleFetchData()
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

  useEffect(()=>{
    if(mapRef.current && showMap !== false){
      mapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  },[mapLoaded, showMap])


  if (isTableExist == "Không tồn tại bàn này!")
    return <h2 className="py-5 mt-[80px] text-center">{isTableExist}</h2>;
  if (isLoading) return <Spinner />;

  return (
    <div className="pb-24 mt-[80px]">
      <Helmet>
        <title>Chọn bàn</title>
        <meta name="select-table" content="Select table" />
      </Helmet>
      <ScrollToTop />
      {idTable &&
        isTableExist == "Bàn đã được sử dụng" &&
        +idTable !== customerName.tables?.at(1) && (
          <p className="py-3 text-center">
            Bàn này đã được sử dụng vui lòng chọn bàn khác nhé!
          </p>
        )}
      {tables && tables.length > 0 ? (
        <>
          <div className="w-full h-12 uppercase font-semibold text-lg text-primary flex justify-center items-center">
            Chọn bàn
          </div>
          <div className="bg-white h-full px-6 xl:px-12">
            <Tabs
              type={"line"}
              onChange={onHandleTabChange}
              defaultActiveKey={"in"}
              tabBarExtraContent={<Button type="link" onClick={()=> setShowMap(true)} className=" hover:text-primary active:text-primary bg-transparent">Xem trên bản đồ</Button>}
              centered
              items={["in", "out"].map((position) => {
                return {
                  label: position === "in" ? "Trong nhà": "Ngoài trời" ,
                  key: position,
                  children: (
                    <div className="w-full mb-10 min-h-screen max-w-full">
                      <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {tableByPosition?.map((table) => (
                          <div
                            key={table.id}
                            onClick={() => handleSelectTable(table.id)}
                            className="cursor-pointer w-auto h-44 border-2 border-primary bg-primary/20 rounded-md flex justify-center items-center"
                          >
                            Bàn {table.id}
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                };
              })}
            />
          </div>
        </>
      ) : (
        <p className="pt-10 text-center">No data is available or all tables are used</p>
      )}
      {showMap && <Suspense fallback={<Spinner/>}><Map setMapLoaded={setMapLoaded} mapRef={mapRef} currentPosition={position} /></Suspense>}
    </div>
  );
}

SelectTable.propTypes = {
  isTableExist: PropTypes.string,
};
export default SelectTable;
