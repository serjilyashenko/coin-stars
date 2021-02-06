import { useCallback, useMemo } from "react";
import {
  isEqual,
  isFuture,
  setDate,
  startOfToday,
  startOfTomorrow,
  subMonths,
} from "date-fns";
import { NB_PRICE_1, NB_PRICE_2, SELL_CURRENCY_DAY } from "../constants";

function closestDateOfMonthDay(monthDay) {
  const today = startOfToday();
  const closestDate = setDate(today, monthDay);

  if (!isFuture(closestDate)) {
    return subMonths(closestDate, 1);
  }

  return closestDate;
}

export default function useNbCalculator(bynData) {
  const bynDateReversed = useMemo(
    () => (bynData ? [...bynData].reverse() : []),
    [bynData]
  );
  const getRateOf = useCallback(
    (date) => bynDateReversed.find((r) => isEqual(date, r.date))?.value,
    [bynDateReversed]
  );

  const sellDate = closestDateOfMonthDay(SELL_CURRENCY_DAY);
  const today = startOfToday();
  const tomorrow = startOfTomorrow();

  const rates = {
    last: {
      date: sellDate,
      value: getRateOf(sellDate),
    },
    today: {
      date: today,
      value: getRateOf(today),
    },
    tomorrow: {
      date: tomorrow,
      value: getRateOf(tomorrow),
    },
  };

  return {
    rates,
    prices: [NB_PRICE_1, NB_PRICE_2].map((price) => ({
      value: price,
      last: price * rates.last.value,
      today: price * rates.today.value,
      tomorrow: price * rates.tomorrow.value,
    })),
  };
}
