import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import labelTracking from '../../../entities/schemas/labelTracking';
import type { Dispatch } from 'redux';
import type {
  GetShipmentTrackings,
  Tracking,
} from '@farfetch/blackout-client/orders/types';

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
export const fetchShipmentTrackingsFactory =
  (getTrackings: GetShipmentTrackings) =>
  (trackingNumbers: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Tracking[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST,
      });

      const result = await getTrackings(trackingNumbers, config);

      dispatch({
        payload: normalize(result, {
          entries: [{ labelTrackings: [labelTracking] }],
        }),
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE,
      });

      throw error;
    }
  };
