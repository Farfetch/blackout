import type { GetSearchIntentsQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the search intents query.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const generateSearchIntentsHash = ({
  searchTerms,
  gender,
}: GetSearchIntentsQuery) =>
  `${searchTerms}${typeof gender !== 'undefined' ? `!${gender}` : ''}`;

export default generateSearchIntentsHash;
