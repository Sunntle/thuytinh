import { useCallback, useState } from "react";
import axios from "../utils/axiosConfig";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (request, getData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios[request.method](request.url, {
        ...request,
      });
      getData(response);
      console.log(response);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
