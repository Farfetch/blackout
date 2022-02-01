import {
  FETCH_TRACKINGS_FAILURE,
  FETCH_TRACKINGS_REQUEST,
  FETCH_TRACKINGS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import labelTracking from '../../../entities/schemas/labelTracking';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetTrackings,
  Tracking,
} from '@farfetch/blackout-client/orders/types';

/**
 * @callback FetchTrackingsThunkFactory
 * @param {Array} trackingNumbers - Array containing all the tracking numbers.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all tracking events for the tracking numbers.
 *
 * @function fetchTrackings
 * @memberof module:orders/actions
 *
 * @param {Function} getTrackings - Get trackings client.
 *
 * @returns {FetchTrackingsThunkFactory} Thunk factory.
 */
const fetchTrackings =
  (getTrackings: GetTrackings) =>
  (trackingNumbers: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Tracking[]> => {
    dispatch({
      type: FETCH_TRACKINGS_REQUEST,
    });

    try {
      const result = await getTrackings(trackingNumbers, config);

      dispatch({
        payload: normalize(result, {
          entries: [{ labelTrackings: [labelTracking] }],
        }),
        type: FETCH_TRACKINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_TRACKINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchTrackings;
