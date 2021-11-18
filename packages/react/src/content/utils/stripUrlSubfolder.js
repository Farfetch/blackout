const SUBFOLDER_REGEX = /^(\/\w{2}-\w{2})\/?/;

/**
 * Remove subfolder for a specific URL.
 *
 * @function stripUrlSubfolder
 * @memberof module:content/utils
 *
 * @param {string} url - Absolute or relative url to be replaced.
 *
 * @returns {string} - URL without subfolder.
 */
export default url => url.replace(SUBFOLDER_REGEX, '/');
