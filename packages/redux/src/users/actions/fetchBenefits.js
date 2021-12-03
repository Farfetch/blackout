import {
  FETCH_BENEFITS_FAILURE,
  FETCH_BENEFITS_REQUEST,
  FETCH_BENEFITS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../entities/schemas/benefit';

/**
 * @callback FetchBenefitsThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user benefits.
 *
 * @function fetchBenefits
 * @memberof module:users/actions
 *
 * @param {Function} getBenefits - Get benefits client.
 *
 * @returns {FetchBenefitsThunkFactory} Thunk factory.
 */
export default getBenefits => config => async dispatch => {
  dispatch({
    type: FETCH_BENEFITS_REQUEST,
  });

  try {
    const result = await getBenefits(config);

    dispatch({
      payload: normalize(result, [userBenefitsSchema]),
      type: FETCH_BENEFITS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_BENEFITS_FAILURE,
    });

    throw error;
  }
};
