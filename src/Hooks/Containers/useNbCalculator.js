import { useCallback, useMemo, useContext } from "react";
import {
  isEqual,
  isFuture,
  setDate,
  startOfToday,
  startOfTomorrow,
  subMonths,
} from "date-fns";
import { NB_BASE_PRICES, SELL_CURRENCY_DAY } from "../../constants";
import { RateContext } from "../../Components/RateProvider";

function closestDateOfMonthDay(monthDay) {
  const today = startOfToday();
  const closestDate = setDate(today, monthDay);

  if (isFuture(closestDate)) {
    return subMonths(closestDate, 1);
  }

  return closestDate;
}

// Container component for useNbCalculator component
export default function useNbCalculator() {
  const { bynData } = useContext(RateContext);
  const { data, loading } = bynData;
  const bynDateReversed = useMemo(() => (data ? [...data].reverse() : []), [
    data,
  ]);
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

  const prices = NB_BASE_PRICES.map((price) => ({
    base: price,
    last: price * rates.last.value,
    today: price * rates.today.value,
    tomorrow: price * rates.tomorrow.value,
  }));

  return {
    loading,
    rates,
    prices,
  };
}
