import {
  useDateRate,
  useSellCurrencyDate,
  useToday,
  useTomorrow,
} from "../Hooks/Dates";
import { DATE_FORMAT, NB_PRICE_1, NB_PRICE_2 } from "../constants";
import { dateFormatter } from "../Utils/Dates";
import "./NbCalculator.scss";

export default function NbCalculator({ rates }) {
  const sellDate = useSellCurrencyDate();
  const sellRate = useDateRate(sellDate, rates);
  const today = useToday();
  const todayRate = useDateRate(today, rates);
  const tomorrow = useTomorrow();
  const tomorrowRate = useDateRate(tomorrow, rates);

  return (
    <div className="nb-calculator">
      <div>
        <table>
          <thead>
            <tr>
              <th />
              <th>{dateFormatter(sellDate, DATE_FORMAT)}</th>
              <th>Today ({dateFormatter(today, DATE_FORMAT)})</th>
              <th>Tomorrow ({dateFormatter(tomorrow, DATE_FORMAT)})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>1$ = {sellRate}</td>
              <td>1$ = {todayRate}</td>
              <td>1$ = {tomorrowRate}</td>
            </tr>
            {[NB_PRICE_1, NB_PRICE_2].map((price) => (
              <tr key={price}>
                <td>{price}$</td>
                <td>{price * sellRate}</td>
                <td>{price * todayRate}</td>
                <td>{price * tomorrowRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
