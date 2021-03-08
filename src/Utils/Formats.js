const locales = ["be-BY", "ru-RU", "en-US"];

export function formatCurrency(value, currencyCode, fractions) {
  const power = fractions ? fractions : 2;
  const factor = 10 ** power;
  const ceilValue = Math.ceil(Number(value) * factor) / factor;

  return ceilValue.toLocaleString(locales, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: currencyCode === "BYN" ? "code" : "symbol",
    minimumFractionDigits: fractions,
  });
}

export function formatDate(date) {
  return date.toLocaleString(locales);
}
