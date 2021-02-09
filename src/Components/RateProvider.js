import { createContext, useState, useEffect } from "react";
import fetchByn from "../Utils/Api/Byn";
import fetchBtc from "../Utils/Api/Btc";

export const RateContext = createContext({});

export default function RateProvider({ children }) {
  const [bynData, setBynData] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const [btcData, setBtcData] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    (async function () {
      const { data, error } = await fetchByn();

      setBynData({
        data,
        error,
        loading: false,
      });
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const { data, error } = await fetchBtc();

      setBtcData({
        data,
        error,
        loading: false,
      });
    })();
  }, []);

  return (
    <RateContext.Provider value={{ bynData, btcData }}>
      {children}
    </RateContext.Provider>
  );
}
