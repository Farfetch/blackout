import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetTrackings,
  toBlackoutError,
  Trackings,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import labelTracking from '../../../entities/schemas/labelTracking';
import type { Dispatch } from 'redux';

/**
 * @param trackingNumbers - Array containing all the tracking numbers.
 * @param config          - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all tracking events for the tracking numbers.
 *
 * @param getTrackings - Get trackings client.
 *
 * @returns Thunk factory.
 */
const fetchTrackingsFactory =
  (getTrackings: GetTrackings) =>
  (trackingNumbers: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Trackings> => {
    try {
      dispatch({
        type: actionTypes.FETCH_TRACKINGS_REQUEST,
      });

      const result = await getTrackings(trackingNumbers, config);

      dispatch({
        payload: normalize(result, {
          entries: [{ labelTrackings: [labelTracking] }],
        }),
        type: actionTypes.FETCH_TRACKINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_TRACKINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchTrackingsFactory;
