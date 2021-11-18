import * as actionTypes from '../actionTypes';

/**
 * @typedef {object} GetSizeGuidesQuery
 *
 * @alias GetSizeGuidesQuery
 * @memberof module:sizeGuides/actions
 *
 * @property {Array} [brandIds] - Brand ids to search for sizeguides.
 * @property {Array} [categoryIds] - Category ids to search for sizeguides.
 */

/**
 * @callback GetSizeguidesThunkFactory
 * @param {GetSizeGuidesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load sizeguides for a given set of brand ids and category ids.
 * This sizeguides logic should be used in cases that the project does not have
 * a category tree.
 * If your project has a category tree you should use the sizeguides logic
 * from @farfetch/blackout-core/products/details/redux.
 *
 * @function doGetSizeGuides
 * @memberof module:sizeGuides/actions
 *
 * @param {Function} getSizeguides - Get size guides client.
 *
 * @returns {GetSizeguidesThunkFactory} Thunk factory.
 */
export default getSizeguides => (query, config) => async dispatch => {
  dispatch({
    meta: { query },
    type: actionTypes.GET_SIZEGUIDES_REQUEST,
  });

  try {
    const result = await getSizeguides(query, config);

    return dispatch({
      meta: { query },
      payload: {
        result,
      },
      type: actionTypes.GET_SIZEGUIDES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: actionTypes.GET_SIZEGUIDES_FAILURE,
    });

    throw error;
  }
};
