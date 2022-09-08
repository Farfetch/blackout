import type { SearchSuggestionsQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the search suggestions query.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const generateSearchSuggestionsHash = ({
  query,
  gender,
  ignoreFilterExclusions,
}: SearchSuggestionsQuery) =>
  `${query}${typeof gender !== 'undefined' ? `!${gender}` : ''}${
    typeof ignoreFilterExclusions !== 'undefined'
      ? `!${ignoreFilterExclusions}`
      : ''
  }`;

export default generateSearchSuggestionsHash;
