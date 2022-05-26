import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import merchantLocationSchema from '../../../entities/schemas/merchantLocation';
import type { FetchMerchantsLocationsAction } from '../../types';
import type {
  GetMerchantsLocations,
  GetMerchantsLocationsQuery,
  MerchantLocation,
} from '@farfetch/blackout-client/merchantsLocations/types';
import type { StoreState } from '../../../types';
import type { ThunkDispatch } from 'redux-thunk';

/**
 * @param query  - Query with parameters to fetch the merchants locations.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch merchants
 * locations for the given merchant, merchantLocation and/or country ids.
 *
 * @param getMerchantsLocations - Get merchants locations client.
 *
 * @returns Thunk factory.
 */
const fetchMerchantsLocationsFactory =
  (getMerchantsLocations: GetMerchantsLocations) =>
  (query: GetMerchantsLocationsQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: ThunkDispatch<StoreState, any, FetchMerchantsLocationsAction>,
  ): Promise<MerchantLocation[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
      });

      const result = await getMerchantsLocations(query, config);

      dispatch({
        payload: normalize(result, [merchantLocationSchema]),
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchMerchantsLocationsFactory;
