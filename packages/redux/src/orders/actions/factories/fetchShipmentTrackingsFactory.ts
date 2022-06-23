import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetShipmentTrackings,
  ShipmentTrackings,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import labelTracking from '../../../entities/schemas/labelTracking';
import type { Dispatch } from 'redux';

/**
 * Fetch all tracking events for the tracking numbers.
 *
 * @param getTrackings - Get trackings client.
 *
 * @returns Thunk factory.
 */
const fetchShipmentTrackingsFactory =
  (getTrackings: GetShipmentTrackings) =>
  (trackingNumbers: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<ShipmentTrackings> => {
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

export default fetchShipmentTrackingsFactory;
