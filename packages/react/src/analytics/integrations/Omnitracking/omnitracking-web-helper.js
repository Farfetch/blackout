/**
 * Returns the client country from the subfolder code.
 *
 * @param {string} subfolder - The current subfolder code.
 *
 * @returns {string} The clientCountry to be sent on the event.
 */
export const getCLientCountryFromSubfolder = (subfolder = '') => {
  const subfolderHasLanguage = subfolder.includes('-');

  // If the subfolder is only composed by country, return undefined.
  if (!subfolderHasLanguage) {
    return undefined;
  }

  const subfolderSplit = subfolder.split('-');
  const clientCountry = subfolderSplit[1];

  return clientCountry ? clientCountry.toUpperCase() : undefined;
};
