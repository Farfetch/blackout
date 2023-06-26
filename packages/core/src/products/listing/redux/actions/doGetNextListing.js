import * as actionTypes from '../actionTypes';
import { getListingHash, getListingResult } from '../selectors';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import searchResultSchema from '../../../../entities/schemas/searchResult';

/**
 * @callback GetNextListingThunkFactory
 * @param {string} slug - Slug to load listing for.
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Loads the next listing for a given slug with specific query parameters.
 * The products of the next page will be stored in the same place as the
 * products of the first result.
 * Supports loading locations of types `shopping`, `sets` and `categories`.
 *
 * @function doGetNextListing
 * @memberof module:products/listing/actions
 *
 * @param {Function} getListing - Get listing client.
 *
 * @returns {GetNextListingThunkFactory} Thunk factory.
 */
export default getListing =>
  (slug, query, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const { productImgQueryParam } = getOptions(getState);
    const currentHash = getListingHash(getState());
    const previousResult = getListingResult(getState());
    const pageIndex = get(previousResult, 'config.pageIndex');
    const totalPages = get(previousResult, 'products.totalPages');

    // When we are in the last page, do not try to fetch the next page.
    if (pageIndex === totalPages) {
      return;
    }

    dispatch({
      payload: { hash: currentHash },
      type: actionTypes.GET_LISTING_REQUEST,
    });

    try {
      const result = await getListing(
        slug,
        { ...query, pageindex: pageIndex + 1 },
        config,
      );

      const normalizedResult = normalize(
        {
          hash: currentHash,
          productImgQueryParam,
          ...result,
        },
        searchResultSchema,
      );

      // Prepend the result with the already existing products in order to
      // provide the correct payload
      normalizedResult.entities.searchResults[
        currentHash
      ].products.entries.unshift(...previousResult.products.entries);

      dispatch({
        payload: {
          ...normalizedResult,
          hash: currentHash,
        },
        type: actionTypes.GET_LISTING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, hash: currentHash },
        type: actionTypes.GET_LISTING_FAILURE,
      });

      throw error;
    }
  };
