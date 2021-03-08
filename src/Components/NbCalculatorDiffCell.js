import classnames from "classnames";
import { formatCurrency } from "../Utils/Formats";
import "./NbCalculatorDiffCell.scss";

export default function NbCalculatorDiffCell({ value }) {
  const absValue = Math.abs(value);

  return (
    <div
      className={classnames("nb-calculator-diff-cell", {
        "nb-calculator-diff-cell_positive": value < 0,
        "nb-calculator-diff-cell_negative": value > 0,
      })}
    >
      {value > 0 ? "+" : null}
      {value < 0 ? "–" : null}
      {formatCurrency(absValue, "BYN")}
    </div>
  );
}
