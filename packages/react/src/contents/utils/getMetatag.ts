import memoize from 'lodash/memoize';
import type { Metatag } from '@farfetch/blackout-client';

/**
 * Check the existance of a specific meta property inside all metatags.
 *
 * @example
 * ```
 * const property = 'og:title';
 * const metatags = [{ propertyType: 'property', propertyDescription: 'og:title' } ];
 * Result of categories = 'Title of the page';
 *
 * ```
 *
 * @param property - Selected meta property.
 * @param metatags - List of all metatags for a specific page.
 *
 * @returns - Metatag content for a specific metatag.
 */
const getMetatag = memoize((property, metatags) => {
  const metaContent = metatags
    ?.filter(
      (metatag: Metatag) =>
        metatag.propertyType === 'property' &&
        property === metatag.propertyDescription,
    )
    .map((metatag: Metatag) => metatag.content)
    .join();

  if (!metaContent) {
    return undefined;
  }

  return metaContent;
});

export default getMetatag;
