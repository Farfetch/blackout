import * as actionTypes from '../actionTypes';
import { buildListingHash } from '../../utils';
import { isListingHydrated, isListingInCache } from '../selectors';
import { normalize } from 'normalizr';
import searchResultSchema from '../../../../entities/schemas/searchResult';

/**
 * @callback GetListingThunkFactory
 * @param {string} slug - Slug to load listing for.
 * @param {object} [query] - Query parameters to apply.
 * @param {boolean} [useCache=false] - If the request result will be cached.
 * @param {object} [setListingHash=true] - Allows the listing hash to be set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product listing for a given slug with specific query parameters.
 * Supports loading locations of types `shopping`, `sets` and `categories`.
 *
 * @function doGetListing
 * @memberof module:products/listing/actions
 *
 * @param {Function} getListing - Get listing client.
 *
 * @returns {GetListingThunkFactory} Thunk factory.
 */
export default getListing =>
  (slug, query, useCache = false, setListingHash = true, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const { productImgQueryParam, subfolder } = getOptions(getState);
    const hash = buildListingHash(subfolder, slug, query);
    const isHydrated = isListingHydrated(getState(), hash);

    // Check if listing data is already fetched.
    // If it is, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the listing data.
    if (isHydrated) {
      return dispatch({
        payload: { hash },
        type: actionTypes.DEHYDRATE_LISTING,
      });
    }

    // Verify if this listing already exists
    if (isListingInCache(getState(), hash)) {
      if (useCache) {
        if (!setListingHash) {
          return;
        }

        return dispatch({
          payload: { hash },
          type: actionTypes.SET_LISTING_HASH,
        });
      } else {
        dispatch({
          type: actionTypes.RESET_LISTING_STATE,
        });
      }
    }

    if (setListingHash) {
      dispatch({
        payload: { hash },
        type: actionTypes.SET_LISTING_HASH,
      });
    }

    dispatch({
      payload: { hash },
      type: actionTypes.GET_LISTING_REQUEST,
    });

    try {
      const result = await getListing(slug, query, config);

      dispatch({
        payload: {
          ...normalize(
            {
              hash,
              // Send this to the entity's `adaptProductImages`
              productImgQueryParam,
              ...result,
            },
            searchResultSchema,
          ),
          hash,
        },
        type: actionTypes.GET_LISTING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, hash },
        type: actionTypes.GET_LISTING_FAILURE,
      });

      throw error;
    }
  };
