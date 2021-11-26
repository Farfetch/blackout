const SUBFOLDER_REGEX = /^(\/\w{2}-\w{2})\/?/;

/**
 * Remove subfolder for a specific URL.
 *
 * @memberof module:contents/utils
 *
 * @param {string} url - Absolute or relative url to be replaced.
 *
 * @returns {string} - URL without subfolder.
 */
const stripUrlSubfolder = (url: string): string =>
  url.replace(SUBFOLDER_REGEX, '/');

export default stripUrlSubfolder;
