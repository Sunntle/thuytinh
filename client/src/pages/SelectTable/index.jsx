import { getPreciseDistance } from "geolib";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";

function SelectTable() {
  const navigate = useNavigate();
  const [table, setTable] = useState(null)
  const {sendRequest, isLoading} = useHttp()
  //test
  useEffect(() => {
    const position1 = {
      latitude: 10.779984,
      longitude: 106.675157,
    };
    navigator.geolocation.getCurrentPosition(async(position) => {
      const position2 = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      const distance = getPreciseDistance(position1, position2);
      console.log(distance);
      await sendRequest({url: '/table?_status_table=eq_1', method: 'get'},setTable)
    });
  }, [sendRequest]);

  const handleSelectTable = async (id) => {
    navigate(`/ban-${id}`);
  };
  console.log(table);
  return <div>Select table before going to the next site</div>;
}

export default SelectTable;
