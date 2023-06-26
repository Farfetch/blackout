import * as actionTypes from '../actionTypes';

/**
 * Reset listing facets to its initial value.
 *
 * @function resetListingFacets
 * @memberof module:products/listing/actions
 *
 * @returns {Function} Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_LISTING_FACETS,
  });
};
