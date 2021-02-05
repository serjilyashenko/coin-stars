import { format } from "date-fns";

export function dateFormatter(date, template) {
  return template ? format(date, template) : date;
}
