import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import queryString from "query-string";
import { subDays, startOfTomorrow } from "date-fns";

function useFetchData(url, deserialize) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      const response = await axios.get(url);

      setData(deserialize(response));
    })();
  }, [url, deserialize]);

  return data;
}

export function useBYN() {
  const usdCode = 145;
  const startDate = subDays(startOfTomorrow(), 364).toUTCString(); // API return only ~365 days
  const endDate = startOfTomorrow().toUTCString();
  const bynUrl = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${usdCode}?${queryString.stringify(
    { startDate, endDate }
  )}`; // USD code: 145

  const deserializeByn = useCallback(
    (response) =>
      response?.data.map((it) => ({
        date: new Date(it.Date),
        value: it.Cur_OfficialRate,
      })),
    []
  );

  return useFetchData(bynUrl, deserializeByn);
}

export function useBTC() {
  const startDate = "2017-09-01";
  const endDate = d3.timeFormat("%Y-%m-%d")(new Date());
  const btcURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  const currentBtcURL = "https://api.coindesk.com/v1/bpi/currentprice.json";

  const deserializeBtc = useCallback(
    (response) =>
      Object.entries(response?.data?.bpi).map(([date, value]) => ({
        date: new Date(date),
        value,
      })),
    []
  );

  const deserializeLastBtc = useCallback(
    (response) => ({
      date: new Date(),
      value: response?.data?.bpi?.USD?.rate_float,
    }),
    []
  );

  const rates = useFetchData(btcURL, deserializeBtc);
  const currentRate = useFetchData(currentBtcURL, deserializeLastBtc);

  if (!rates || !currentRate) {
    return null;
  }

  return [...rates, currentRate];
}
