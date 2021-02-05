import {
  startOfToday,
  startOfTomorrow,
  setDate,
  isFuture,
  subMonths,
  isEqual,
} from "date-fns";
import { dateFormatter } from "../Utils/Dates";
import { SELL_CURRENCY_DAY } from "../constants";

export function useToday(template) {
  return dateFormatter(startOfToday(), template);
}

export function useTomorrow(template) {
  return dateFormatter(startOfTomorrow(), template);
}

export function useSellCurrencyDate(template) {
  const today = useToday();
  let sellDate = setDate(today, SELL_CURRENCY_DAY);

  if (!isFuture(sellDate)) {
    sellDate = subMonths(sellDate, 1);
  }

  return dateFormatter(sellDate, template);
}

// FIXME: it knows about Rate structure :(
export function useDateRate(date, rates) {
  return rates ? rates.reverse().find((r) => isEqual(date, r.date))?.value : 0;
}
