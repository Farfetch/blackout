import memoize from 'lodash/memoize';

/**
 * Check the existence of a specific meta property inside all metatags.
 *
 * @function getMetatag
 * @memberof module:content/utils
 *
 * @example
 * const property = 'og:title';
 * const metatags = [{ property: { type: 'property', description: 'og:title' } }];
 * Result of categories = 'Title of the page';
 *
 * @param   {string} property - Selected meta property.
 * @param   {Array} metatags - List of all metatags for a specific page.
 *
 * @returns {string | undefined} - Metatag content for a specific metatag.
 */
export default memoize((property, metatags) => {
  const metaContent = metatags
    ?.filter(
      metatag =>
        metatag.property.type === 'property' &&
        property === metatag.property.description,
    )
    .map(metatag => metatag.content)
    .join();

  if (!metaContent) {
    return undefined;
  }

  return metaContent;
});
