import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";
import useNbCalculator from "../Hooks/Containers/useNbCalculator";
import NbCalculatorDiffCell from "./NbCalculatorDiffCell";
import { formatCurrency } from "../Utils/Formats";
import "./NbCalculator.scss";

export default function NbCalculator() {
  const { loading, rates, prices } = useNbCalculator();

  if (loading) {
    return null;
  }

  return (
    <div className="nb-calculator">
      <div className="nb-calculator__container">
        <table>
          <thead>
            <tr>
              <th />
              <th>Sell Day</th>
              <th className="accent" />
              <th className="accent">
                Today ({format(rates.today.date, DATE_FORMAT)})
              </th>
              <th />
              <th>Tomorrow ({format(rates.tomorrow.date, DATE_FORMAT)})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
              <td className="accent" />
              <td className="accent">
                {formatCurrency(1, "USD", 0)} ={" "}
                {formatCurrency(rates.today.value, "BYN", 4)}
              </td>
              <td />
              <td>
                {formatCurrency(1, "USD", 0)} ={" "}
                {formatCurrency(rates.tomorrow.value, "BYN", 4)}
              </td>
            </tr>
            {prices.map((item) => (
              <tr key={item.base}>
                <td>{formatCurrency(item.base, "USD")}</td>
                <td>
                  <div>
                    {formatCurrency(item.lastRate, "BYN", 4)} (
                    {format(item.lastDate, DATE_FORMAT)})
                  </div>
                  <div>{formatCurrency(item.last, "BYN")}</div>
                </td>
                <td className="accent">
                  <NbCalculatorDiffCell
                    value={item.today - item.last}
                    fractions={1}
                  />
                </td>
                <td className="accent">{formatCurrency(item.today, "BYN")}</td>
                <td>
                  <NbCalculatorDiffCell
                    value={item.tomorrow - item.last}
                    fractions={1}
                  />
                </td>
                <td>{formatCurrency(item.tomorrow, "BYN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
