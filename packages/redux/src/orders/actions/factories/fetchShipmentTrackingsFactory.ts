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
import type { FetchShipmentTrackingsAction } from '../../types/actions.types';

/**
 * Fetch all tracking events for the tracking numbers.
 *
 * @param getShipmentTrackings - Get shipment trackings client.
 *
 * @returns Thunk factory.
 */
const fetchShipmentTrackingsFactory =
  (getShipmentTrackings: GetShipmentTrackings) =>
  (trackingCodes: string, config?: Config) =>
  async (
    dispatch: Dispatch<FetchShipmentTrackingsAction>,
  ): Promise<ShipmentTrackings> => {
    try {
      dispatch({
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST,
      });

      const result = await getShipmentTrackings(trackingCodes, config);

      dispatch({
        payload: normalize(result, {
          entries: [{ labelTrackings: [labelTracking] }],
        }),
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchShipmentTrackingsFactory;
