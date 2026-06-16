export function formatMonthYear(date) {
  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}