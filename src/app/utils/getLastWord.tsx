export function getLastWord(inputString: string) {
  // Trim the string to remove leading and trailing whitespaces
  const trimmedString = inputString?.trim();

  // Split the string into an array of words
  const words = trimmedString?.split(/\s+/);

  // Get the last word (if any)
  const lastWord = words?.length > 0 ? words[words.length - 1] : "";

  return lastWord;
}
