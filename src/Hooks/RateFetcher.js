import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as d3 from "d3";
import queryString from "query-string";
import { subDays, startOfTomorrow } from "date-fns";

async function makeFetch(url) {
  try {
    const response = await axios.get(url);
    return {
      response,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      response: null,
      error: e,
    };
  }
}

async function fetchBYN() {
  const usdCode = 145;
  const startDate = subDays(startOfTomorrow(), 364).toUTCString(); // API return only ~365 days
  const endDate = startOfTomorrow().toUTCString();
  const bynUrl = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${usdCode}?${queryString.stringify(
    { startDate, endDate }
  )}`; // USD code: 145

  const { response, error } = await makeFetch(bynUrl);
  return {
    data: response?.data.map((it) => ({
      date: new Date(it.Date),
      value: it.Cur_OfficialRate,
    })),
    error,
  };
}

async function fetchBTC() {
  const startDate = "2017-09-01";
  const endDate = d3.timeFormat("%Y-%m-%d")(new Date());
  const btcURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  const currentBtcURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

  const ratesPromise = makeFetch(btcURL);
  const currentRatePromise = makeFetch(currentBtcURL);

  const [ratesResponse, currentRateResponse] = await Promise.all([
    ratesPromise,
    currentRatePromise,
  ]);

  return {
    data: [
      ...Object.entries(ratesResponse.response?.data?.bpi).map(
        ([date, value]) => ({
          date: new Date(date),
          value,
        })
      ),
      {
        date: new Date(),
        value: currentRateResponse.response?.data?.bpi?.USD?.rate_float,
      },
    ],
    error: ratesResponse.error || currentRateResponse.error,
  };
}

const RateFetcherContext = React.createContext();
export const useRateFetcher = () => useContext(RateFetcherContext);

const initState = { data: null, error: null, loading: true };

export function RateFetcherProvider({ children }) {
  const [bynData, setBynData] = useState(initState);
  useEffect(() => {
    (async function () {
      const bynData = await fetchBYN();
      setBynData({ ...bynData, loading: false });
    })();
  }, []);

  const [btcData, setBtcData] = useState(initState);
  useEffect(() => {
    (async function () {
      const btcData = await fetchBTC();
      setBtcData({ ...btcData, loading: false });
    })();
  }, []);

  return (
    <RateFetcherContext.Provider value={{ bynData, btcData }}>
      {children}
    </RateFetcherContext.Provider>
  );
}
