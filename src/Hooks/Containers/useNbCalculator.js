import { useCallback, useMemo, useContext } from "react";
import {
  endOfMonth,
  isEqual,
  isFuture,
  setDate,
  startOfDay,
  startOfToday,
  startOfTomorrow,
  subMonths,
} from "date-fns";
import { CONTRACT_1_SELL_DAY } from "../../constants";
import { RateContext } from "../../Components/RateProvider";
import { Contract1, Contract2 } from "../../constants";

function closestDateOfMonthDay(monthDay) {
  const today = startOfToday();
  const closestDate = setDate(today, monthDay);

  if (isFuture(closestDate)) {
    return subMonths(closestDate, 1);
  }

  return closestDate;
}

function closestEndOfMonth() {
  const today = startOfToday();
  const previousMonthDay = subMonths(today, 1);

  return startOfDay(endOfMonth(previousMonthDay));
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

  const contract1sellDate = closestDateOfMonthDay(CONTRACT_1_SELL_DAY);
  const contract2sellDate = closestEndOfMonth();

  const today = startOfToday();
  const tomorrow = startOfTomorrow();

  const rates = {
    today: {
      date: today,
      value: getRateOf(today),
    },
    tomorrow: {
      date: tomorrow,
      value: getRateOf(tomorrow),
    },
  };

  const prices = [
    {
      base: Contract1,
      lastDate: contract1sellDate,
      lastRate: getRateOf(contract1sellDate),
      last: Contract1 * getRateOf(contract1sellDate),
      today: Contract1 * rates.today.value,
      tomorrow: Contract1 * rates.tomorrow.value,
    },
    {
      base: Contract2,
      lastDate: contract2sellDate,
      lastRate: getRateOf(contract2sellDate),
      last: Contract2 * getRateOf(contract2sellDate),
      today: Contract2 * rates.today.value,
      tomorrow: Contract2 * rates.tomorrow.value,
    },
  ];

  return {
    loading,
    rates,
    prices,
  };
}
