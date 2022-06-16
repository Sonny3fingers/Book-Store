import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      // setIsLoading(true);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await response.json();

        applyData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    },
    [applyData]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
