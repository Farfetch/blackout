import {
  GET_TRACKINGS_FAILURE,
  GET_TRACKINGS_REQUEST,
  GET_TRACKINGS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import labelTracking from '../../../entities/schemas/labelTracking';

/**
 * @callback GetTrackingThunkFactory
 * @param {Array} trackingNumbers - Array containing all the tracking numbers.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get all tracking events for the tracking numbers.
 *
 * @function doGetTracking
 * @memberof module:orders/actions
 *
 * @param {Function} getTrackings - Get trackings client.
 *
 * @returns {GetTrackingThunkFactory} Thunk factory.
 */
export default getTrackings => (trackingNumbers, config) => async dispatch => {
  dispatch({
    type: GET_TRACKINGS_REQUEST,
  });

  try {
    const result = await getTrackings(trackingNumbers, config);

    dispatch({
      payload: normalize(result, {
        entries: [{ labelTrackings: [labelTracking] }],
      }),
      type: GET_TRACKINGS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_TRACKINGS_FAILURE,
    });

    throw error;
  }
};
