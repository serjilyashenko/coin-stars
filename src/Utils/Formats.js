export function formatToFixed(value, fractions = 2) {
  return value ? Number(value).toFixed(fractions) : "0";
}
