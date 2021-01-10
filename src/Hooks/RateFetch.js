import { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { subDays, startOfTomorrow } from "date-fns";

const usdCode = 145;
const startDate = subDays(startOfTomorrow(), 364).toUTCString(); // API return only ~365 days
const endDate = startOfTomorrow().toUTCString();
const url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${usdCode}?${queryString.stringify(
  { startDate, endDate }
)}`; // USD code: 145

export function useBYN() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function () {
      const response = await axios.get(url);

      setData(
        response?.data.map((it) => ({
          date: new Date(it.Date),
          value: it.Cur_OfficialRate,
        }))
      );
    })();
  }, []);

  return data;
}
