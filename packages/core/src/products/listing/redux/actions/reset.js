import * as actionTypes from '../actionTypes';
import resetListingFacets from './resetListingFacets';
import resetState from './resetState';

/**
 * Reset listing related entities to its initial value.
 *
 * @private
 *
 * @function
 * @memberof module:products/listing/actions
 *
 * @example
 * // Store before executing action
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *         searchResults:{ '123-foo': {...} }
 *     }
 * }
 *
 * // Result of reset entities:
 * const store = { entities: {} }
 *
 * @returns {Function} Dispatch reset listing entities action.
 */
const resetEntities = () => dispatch => {
  dispatch({
    type: actionTypes.RESET_LISTING_ENTITIES,
  });
};

/**
 * Reset listing state and related entities to its initial value.
 *
 * @function reset
 * @memberof module:products/listing/actions
 *
 * @example
 * import { reset } from '@farfetch/blackout-core/products/listing/redux';
 *
 * // State and store before executing action
 * const state = {
 *     hash: '123-foo',
 *     error: {'123-foo': 'Error'},
 *     isLoading: {'123-foo': false},
 *     ...
 * };
 * const store = {
 *     entities: {
 *         products: { 123: {...} }
 *         searchResults:{ '123-foo': {...} }
 *     }
 * }
 *
 * // Result of reset:
 * const state =  { hash: null, error: {}, isLoading: {}, isHydrated: {} }
 * const store = { entities: {} }
 *
 * // Usage
 * dispatch(reset());
 *
 * @returns {Function} Dispatch reset listing state and entities action.
 */
export default () => dispatch => {
  dispatch(resetListingFacets());
  dispatch(resetState());
  dispatch(resetEntities());
};
