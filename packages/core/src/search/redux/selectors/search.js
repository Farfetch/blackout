// @TODO: Remove this file in version 2.0.0.
import * as fromSearchIntentsReducer from '../reducer/searchIntents';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';

/**
 * Retrieves the error thrown by current search term.
 *
 * @memberof module:search/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the getSearchIntentsError method instead.
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} Search error.
 *
 * @example
 * import { getSearchError } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSearchError(state)
 * });
 *
 */
export const getSearchError = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getSearchError',
    'getSearchIntentsError',
  );

  return fromSearchIntentsReducer.getError(state.search.intents);
};

/**
 * Retrieves the loading condition from current search term.
 *
 * @memberof module:search/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the areSearchIntentsLoading method instead.
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Whether a search term response is loading or not.
 *
 * @example
 * import { isSearchLoading } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSearchLoading(state)
 * });
 *
 */
export const isSearchLoading = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'isSearchLoading',
    'areSearchIntentsLoading',
  );

  return fromSearchIntentsReducer.getIsLoading(state.search.intents);
};

/**
 * Retrieves the result of a specific search.
 *
 * @memberof module:search/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the getSearchIntentsResult method instead.
 *
 * @param {object} state - Application state.
 *
 * @returns {?object} Search result.
 *
 * @example
 * import { getSearchResult } from '@farfetch/blackout-core/search/redux';
 *
 * const mapStateToProps = state => ({
 *     result: getSearchResult(state)
 * });
 *
 */
export const getSearchResult = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'getSearchResult',
    'getSearchIntentsResult',
  );

  return fromSearchIntentsReducer.getResult(state.search.intents);
};
