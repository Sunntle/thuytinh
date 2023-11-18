import { useEffect, useState } from "react";
import { Spinner } from "../../../components";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Typography } from "antd";
import useHttp from "../../../hooks/useHttp";

function CancelBooking() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null)
  const navigate = useNavigate();
  const {sendRequest} = useHttp()
  const [searchParams] = useSearchParams();
  const getToken = searchParams.get("token");

  useEffect(() => {
    const handleCancel = async()=>{
        try{
            if(getToken){
                const request = {token: getToken}
                const response = await sendRequest({url: `/table/cancel-booking`, method: 'put', request}, undefined, true)
                setMessage(response)
            }else{
                setMessage({success: false, message: "Invalid token"})
            }
            
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }   
    }
    handleCancel()
  },[getToken, sendRequest]);
  if (loading) return <Spinner />;
  if(message.success == false && message.message == "Invalid token") return <Navigate to="*" replace/>
  return (
    <div className="mt-[80px] h-[50vh] flex items-end justify-center">
      <div className="text-center ">
        <Typography.Title level={3}>{message.message}</Typography.Title>
        <Button
            size="large"
          onClick={() => navigate("/")}
          type="submit"
          className="mt-6 hover:bg-[#F0A500E5] transition-colors duration-300 text-base bg-orange-500 text-white rounded-md focus:outline-none focus:ring focus:ring-orange-500"
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}

export default CancelBooking;
