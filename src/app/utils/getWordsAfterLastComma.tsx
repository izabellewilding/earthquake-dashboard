export function getWordsAfterLastComma(inputString: string) {
  // Find the last comma in the string
  const lastCommaIndex = inputString.lastIndexOf(",");

  // Check if a comma was found
  if (lastCommaIndex !== -1) {
    // Extract the words after the last comma
    const wordsAfterLastComma = inputString.slice(lastCommaIndex + 1).trim();

    return wordsAfterLastComma;
  } else {
    // No comma found, return the original string
    return inputString.trim();
  }
}
