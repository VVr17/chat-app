/**
 * Checks if a given string is a non-empty, non-whitespace string.
 *
 * @param {string} str - The string to be checked.
 * @returns {boolean} - Returns true if the input is a valid non-empty string, otherwise false.
 */
export const isRealString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};
