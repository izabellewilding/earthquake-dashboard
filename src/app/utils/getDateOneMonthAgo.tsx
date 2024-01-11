export function getDateOneMonthAgo() {
  const today = new Date();

  // Set the current date to the first day of the month
  today.setDate(1);

  // Subtract one day to move to the last day of the previous month
  today.setDate(today.getDate() - 1);

  return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}
