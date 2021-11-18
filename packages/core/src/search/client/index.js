/**
 * Search clients.
 *
 * @module search/client
 * @category Search
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/search/client',
  '@farfetch/blackout-core/search',
);

// @TODO: Remove this export in version 2.0.0.
export { default as getSearch } from './getSearch';
export { default as getSearchDidYouMean } from './getSearchDidYouMean';
export { default as getSearchIntents } from './getSearchIntents';
export { default as getSearchSuggestions } from './getSearchSuggestions';
