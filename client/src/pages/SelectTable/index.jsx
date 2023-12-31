import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { message, Tabs } from "antd";
import "./index.css";
import { useSelector } from "react-redux";
import { Spinner } from "../../components/index.js";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { ScrollToTop } from "../../utils/format.js";
import { MdOutlineOutdoorGrill } from "react-icons/md";
import { PiHouseBold } from "react-icons/pi";

const Map = lazy(() => import("./MapComponent.jsx"));

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      message.open({
        type: "error",
        content: "User denied the request for Geolocation.",
      });
      console.log("User denied the request for Geolocation.");
      return "User denied the request for Geolocation.";

    case error.POSITION_UNAVAILABLE:
      message.open({
        type: "error",
        content: "Location information is unavailable.",
      });
      console.log("Location information is unavailable.");
      return "Location information is unavailable.";

    case error.TIMEOUT:
      message.open({
        type: "error",
        content: "The request to get user location timed out.",
      });
      console.log("The request to get user location timed out.");
      return "The request to get user location timed out.";

    case error.UNKNOWN_ERROR:
      message.open({ type: "error", content: "An unknown error occurred." });
      console.log("An unknown error occurred.");
      return "An unknown error occurred.";
  }
}

function SelectTable() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [tableByPosition, setTableByPosition] = useState([]);
  const [position, setPosition] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { sendRequest, isLoading } = useHttp();
  const location = useLocation();
  const customerName = useSelector((state) => state.customerName);
  const isTableExist = location.state?.isTableExist; //ban dang duoc su dung
  const idTable = location.state?.prevTable; //1
  const mapRef = useRef(null);

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
    navigator.geolocation.getCurrentPosition((location) => {
      setPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }, showError);
    const handleFetchData = async () => {
      await sendRequest(
        { method: "get", url: "/table?_status_table=eq_0" },
        setTables,
      );
    };
    handleFetchData();
  }, [sendRequest]);

  useEffect(() => {
    setTableByPosition(tables);
  }, [tables]);

  const onHandleTabChange = (key) => {
    if (key === "all") {
      return setTableByPosition(tables);
    }
    const filteredValue = tables?.filter((table) => table.position === key);
    setTableByPosition(filteredValue);
  };

  useEffect(() => {
    if (mapRef.current && showMap !== false) {
      mapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [mapLoaded, showMap]);

  if (isTableExist == "Không tồn tại bàn này!")
    return <h2 className="py-5 mt-[80px] text-center">{isTableExist}</h2>;
  if (isLoading) return <Spinner />;

  return (
    <div className="pb-24 mt-[88px]">
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
          <div className="bg-white h-full px-6 xl:px-12 lg:mb-64">
            <Tabs
              type={"line"}
              onChange={onHandleTabChange}
              defaultActiveKey={"all"}
              tabBarExtraContent={
                <button
                  onClick={() => setShowMap(true)}
                  className="font-semibold text-sm md:text-base text-secondary hover:text-secondary/80 transition-colors duration-300 bg-transparent"
                >
                  Xem trên bản đồ
                </button>
              }
              centered
              items={["all", "in", "out"].map((position) => {
                return {
                  label:
                    position === "all"
                      ? "Tất cả"
                      : position === "in"
                      ? "Trong nhà"
                      : "Ngoài trời",
                  key: position,
                  children: (
                    <div className="w-full mb-10 min-h-fit max-w-full">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {tableByPosition?.map((table) => (
                          <div
                            key={table.id}
                            onClick={() => handleSelectTable(table.id)}
                            className="relative shadow group overflow-hidden inline-flex flex-col justify-center items-center space-y-3 transition-colors duration-300 text-primary cursor-pointer w-auto h-44 bg-primary/5 border border-primary/10 rounded"
                          >
                            <span className="absolute z-10 h-full w-0 bg-primary/10 group-hover:w-full top-1/2 left-0 -translate-y-1/2 ease-linear transition-all duration-300"></span>

                            <span className="animation-to-right"></span>
                            <span className="animation-to-bottom"></span>
                            <span className="animation-to-left"></span>
                            <span className="animation-to-top"></span>

                            {table.position === "in" ? (
                              <PiHouseBold className="w-8 h-8" />
                            ) : (
                              <MdOutlineOutdoorGrill className="w-8 h-8" />
                            )}
                            <span className="font-medium">Bàn {table.id}</span>
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
        <p className="pt-10 text-center">
          No data is available or all tables are used
        </p>
      )}

      {showMap && (
        <Suspense fallback={<Spinner />}>
          <Map
            setMapLoaded={setMapLoaded}
            mapRef={mapRef}
            currentPosition={position}
          />
        </Suspense>
      )}
    </div>
  );
}

SelectTable.propTypes = {
  isTableExist: PropTypes.string,
};
export default SelectTable;
