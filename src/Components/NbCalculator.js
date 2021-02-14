import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";
import useNbCalculator from "../Hooks/Containers/useNbCalculator";
import NbCalculatorDiffCell from "./NbCalculatorDiffCell";
import { formatToFixed } from "../Utils/Formats";
import "./NbCalculator.scss";

export default function NbCalculator() {
  const { loading, rates, prices } = useNbCalculator();

  if (loading) {
    return null;
  }

  return (
    <div className="nb-calculator">
      <div>
        <table>
          <thead>
            <tr>
              <th />
              <th>{format(rates.last.date, DATE_FORMAT)}</th>
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
              <td>1$ = {rates.last.value} р.</td>
              <td className="accent">
                <NbCalculatorDiffCell
                  value={rates.today.value - rates.last.value}
                  fractions={4}
                />
              </td>
              <td className="accent">1$ = {rates.today.value} р.</td>
              <td>
                <NbCalculatorDiffCell
                  value={rates.tomorrow.value - rates.last.value}
                  fractions={4}
                />
              </td>
              <td>1$ = {rates.tomorrow.value} р.</td>
            </tr>
            {prices.map((item) => (
              <tr key={item.base}>
                <td>{formatToFixed(item.base, 1)}$</td>
                <td>{formatToFixed(item.last, 1)} р.</td>
                <td className="accent">
                  <NbCalculatorDiffCell
                    value={item.today - item.last}
                    fractions={1}
                  />
                </td>
                <td className="accent">{formatToFixed(item.today, 1)} р.</td>
                <td>
                  <NbCalculatorDiffCell
                    value={item.tomorrow - item.last}
                    fractions={1}
                  />
                </td>
                <td>{formatToFixed(item.tomorrow, 1)} р.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
