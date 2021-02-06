import classnames from "classnames";
import "./NbCalculatorDiffCell.scss";

export default function NbCalculatorDiffCell({ value }) {
  const absValue = Math.abs(value);
  const fractionDigits = absValue < 10 ? 4 : 1;

  return (
    <div
      className={classnames("nb-calculator-diff-cell", {
        "nb-calculator-diff-cell_positive": value < 0,
        "nb-calculator-diff-cell_negative": value > 0,
      })}
    >
      ({value > 0 ? "+" : null}
      {value < 0 ? "–" : null}
      {value ? Number(absValue).toFixed(fractionDigits) : "0"})
    </div>
  );
}
