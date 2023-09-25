import React, {useState} from 'react';
import serviceImg from '../../assets/images/Service 24_7-pana.png'
import {useDispatch} from "react-redux";
import {getCustomerName} from "../../redux/CustomerName/customerNameSlice.js";
import {useNavigate} from "react-router-dom";

const EnterName = () => {
    const [customerName, setCustomerName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeName = (e) => {
        setCustomerName(e.target.value)
    }

    const handleSubmitName = () => {
        dispatch(getCustomerName(customerName))
        navigate('/menu')
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="pb-24 lg:py-24 flex flex-col items-center space-y-3">
                <div className="w-6/12 m-auto">
                    <img
                        className="w-full h-full"
                        src={serviceImg}
                        alt=""
                    />
                </div>
                <span className="font-medium text-sm w-9/12 lg:text-xl text-center">Vui lòng nhập tên để chúng em tiện xưng hô và phục vụ tốt nhất</span>
                <input onChange={handleChangeName} value={customerName} type="text" className="w-9/12 h-12 border rounded-lg pl-3" placeholder="Nhập tên"/>
                <button onClick={handleSubmitName} className="w-9/12 h-12 bg-primary text-white active:bg-opacity-80 rounded-lg text-lg font-medium">Tiếp tục</button>
            </div>
        </div>
    );
};

export default EnterName;