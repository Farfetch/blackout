const SUBFOLDER_REGEX = /^(\/\w{2}-\w{2})\/?/;

/**
 * Remove subfolder for a specific URL.
 *
 * @param url - Absolute or relative url to be replaced.
 *
 * @returns - URL without subfolder.
 */
const stripUrlSubfolder = (url: string): string =>
  url.replace(SUBFOLDER_REGEX, '/');

export default stripUrlSubfolder;
