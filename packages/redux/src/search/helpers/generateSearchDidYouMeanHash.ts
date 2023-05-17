import type { GetSearchDidYouMeanQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the search did you mean query.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const generateSearchDidYouMeanHash = ({
  searchTerms,
  genders,
}: GetSearchDidYouMeanQuery) =>
  `${searchTerms}${
    typeof genders !== 'undefined' ? `!${genders.join(',')}` : ''
  }`;

export default generateSearchDidYouMeanHash;
