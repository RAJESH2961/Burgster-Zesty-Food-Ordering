import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Something went wrong, failed to send request");
    }
    return resData;
}

export default function useHttp(url, config = {}, initialData = null) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);

    function clearData(){
        setData(null);

    }

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong!");
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if (!config.method || config.method.toUpperCase() === "GET") {
            sendRequest();
        }
    }, [sendRequest]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}
