import {  useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import serviceImg from "../../assets/images/Service 24_7-pana.png";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerName } from "../../redux/CustomerName/customerNameSlice.js";
import useHttp from "../../hooks/useHttp.js";
const EnterName = (props) => {
  const [customerName, setCustomerName] = useState("");
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const customerNameState = useSelector(state => state.customerName)
  const idTable = location.pathname.split("/")[1].split("-")[1]
  const handleChangeName = useCallback((e) => {
    setCustomerName(e.target.value);
  },[]);

  const storeToken = useCallback((data)=>{
    localStorage.setItem("tableToken", data)
  },[])

  const handleSubmitName = useCallback(async() => {
    const data = {tables: [idTable], name: customerName, timestamp: new Date().valueOf()}
    await sendRequest({
      method: 'put',
      url: '/table/token',
      ...data
    }, storeToken)
    dispatch(getCustomerName(data))
    // navigate(`/ban-${customerNameState.tables[0]}/menu`);
  },[customerName, dispatch, idTable, sendRequest, storeToken]);
  if(customerNameState.isLoading) return "Loading...."
  if(customerNameState?.name?.length  > 0) return props.children
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="pb-24 lg:pb-0 lg:px-36 lg:py-24 flex flex-col lg:flex-row justify-center items-center space-y-3">
        <div className="w-6/12 lg:w-6/12 m-auto">
          <img className="w-full h-full" src={serviceImg} alt="" />
        </div>
        <div className="flex flex-col items-center space-y-3 lg:space-y-6">
          <span className="font-medium text-sm w-9/12 lg:text-xl text-center">
            Vui lòng nhập tên để chúng em tiện xưng hô và phục vụ tốt nhất
          </span>
          <input
            onChange={handleChangeName}
            value={customerName}
            type="text"
            className="w-9/12 h-12 border rounded-lg pl-3"
            placeholder="Nhập tên"
          />
          <button
            onClick={handleSubmitName}
            className="w-9/12 h-12 bg-primary text-white active:bg-opacity-80 rounded-lg text-lg font-medium"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};
EnterName.propTypes = {
  children: PropTypes.any
};
export default EnterName;
