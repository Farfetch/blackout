import {
  GET_BENEFITS_FAILURE,
  GET_BENEFITS_REQUEST,
  GET_BENEFITS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import userBenefitsSchema from '../../../entities/schemas/benefit';

/**
 * @callback GetBenefitsThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create get user benefits.
 *
 * @function doGetBenefits
 * @memberof module:profile/actions
 *
 * @param {Function} getBenefits - Get benefits client.
 *
 * @returns {GetBenefitsThunkFactory} Thunk factory.
 */
export default getBenefits => config => async dispatch => {
  dispatch({
    type: GET_BENEFITS_REQUEST,
  });

  try {
    const result = await getBenefits(config);

    dispatch({
      payload: normalize(result, [userBenefitsSchema]),
      type: GET_BENEFITS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_BENEFITS_FAILURE,
    });

    throw error;
  }
};
