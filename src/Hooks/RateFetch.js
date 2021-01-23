import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import queryString from "query-string";
import { subDays, startOfTomorrow } from "date-fns";

function useCurrencyRequest(bynUrl, deserialize) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      const response = await axios.get(bynUrl);

      setData(deserialize(response));
    })();
  }, [bynUrl, deserialize]);

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

  return useCurrencyRequest(bynUrl, deserializeByn);
}

export function useBTC() {
  const startDate = "2017-09-01";
  const endDate = d3.timeFormat("%Y-%m-%d")(new Date());
  const btcURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

  const deserializeBtc = useCallback(
    (response) =>
      Object.entries(response?.data?.bpi).map(([date, value]) => ({
        date: new Date(date),
        value,
      })),
    []
  );

  return useCurrencyRequest(btcURL, deserializeBtc);
}
