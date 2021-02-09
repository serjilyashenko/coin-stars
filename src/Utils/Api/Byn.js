import { startOfTomorrow, subDays } from "date-fns";
import queryString from "query-string";
import makeFetch from "./Fetch";

export async function fetchByn() {
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

export default fetchByn;
