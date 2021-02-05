import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";
import useNbCalculator from "../Hooks/useNbCalculator";
import "./NbCalculator.scss";

export default function NbCalculator({ bynData }) {
  const { rates, prices } = useNbCalculator(bynData);

  return (
    <div className="nb-calculator">
      <div>
        <table>
          <thead>
            <tr>
              <th />
              <th>{format(rates.last.date, DATE_FORMAT)}</th>
              <th>Today ({format(rates.today.date, DATE_FORMAT)})</th>
              <th>Tomorrow ({format(rates.tomorrow.date, DATE_FORMAT)})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>1$ = {rates.last.value}</td>
              <td>1$ = {rates.today.value}</td>
              <td>1$ = {rates.tomorrow.value}</td>
            </tr>
            {prices.map((item) => (
              <tr key={item.value}>
                <td>{item.value}$</td>
                <td>{item.last}</td>
                <td>{item.today}</td>
                <td>{item.tomorrow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
