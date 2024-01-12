export const getDataOneYearAgo = () => {
  // Get the current date
  const currentDate = new Date();

  // Subtract 1 from the current year
  const lastYear = currentDate.getFullYear() - 1;

  // Create a new Date object with the updated year
  const oneYearAgo = new Date(
    lastYear,
    currentDate.getMonth(),
    currentDate.getDate()
  )
    .toISOString()
    .split("T")[0];

  return oneYearAgo;
};
