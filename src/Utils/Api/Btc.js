import * as d3 from "d3";
import { makeFetch } from "./Fetch";

export async function fetchBtc() {
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

export default fetchBtc;
