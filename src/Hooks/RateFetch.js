import { useEffect, useState } from "react";
import axios from "axios";

const url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=Sat%2C+11+Jan+2020+21%3A00%3A00+GMT&endDate=Thu%2C+07+Jan+2021+21%3A00%3A00+GMT`; // USD code: 145

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
