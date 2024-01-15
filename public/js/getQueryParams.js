/**
 * Parses and retrieves query parameters from the current window's URL.
 *
 * @returns {Object} - An object containing key-value pairs of the query parameters.
 */
export const getQueryParams = () => {
  // Extract the search query string from the window's location
  const searchQuery = window.location.search.substring(1);

  // Decode the URI-encoded query string and convert it into an object
  const params = JSON.parse(
    '{"' +
      decodeURI(searchQuery)
        .replace(/&/g, '","')
        .replace(/\+/g, " ")
        .replace(/=/g, '":"') +
      '"}'
  );

  return params;
};
