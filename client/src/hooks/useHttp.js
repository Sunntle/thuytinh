import { useCallback, useState } from "react";
import axios from "../utils/axiosConfig";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (request, getData, render) => {
    setIsLoading(true);
    setError(null);
    try {
      const {method, url, ...rest} = request
      const response = await axios[method](url, {
          ...rest,
      });
      if(render) return response
      getData(response);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }finally{
      setIsLoading(false);
    }
    
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
