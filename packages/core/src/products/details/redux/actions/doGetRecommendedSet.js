import {
  GET_RECOMMENDED_SET_FAILURE,
  GET_RECOMMENDED_SET_REQUEST,
  GET_RECOMMENDED_SET_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import recommendedSet from '../../../../entities/schemas/recommendedSet';

/**
 * @callback GetRecommendedSetThunkFactory
 * @param {number} recommendedSetId - Numeric identifier of the recommendSet.
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product recommended sets for a given recommended set id.
 *
 * @function doGetRecommendedSet
 * @memberof module:products/details/actions
 *
 * @param {Function} getRecommendedSet - Get recommended set client.
 *
 * @returns {GetRecommendedSetThunkFactory} Thunk factory.
 */
export default getRecommendedSet =>
  (recommendedSetId, query = {}, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      payload: { recommendedSetId },
      type: GET_RECOMMENDED_SET_REQUEST,
    });

    try {
      const result = await getRecommendedSet(recommendedSetId, query, config);
      const { productImgQueryParam } = getOptions(getState);

      return dispatch({
        payload: {
          ...normalize(
            {
              ...result,
              id: recommendedSetId,
              // Send this to the entity's `adaptProductImages`
              productImgQueryParam,
            },
            recommendedSet,
          ),
          recommendedSetId,
        },
        type: GET_RECOMMENDED_SET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, recommendedSetId },
        type: GET_RECOMMENDED_SET_FAILURE,
      });

      throw error;
    }
  };
