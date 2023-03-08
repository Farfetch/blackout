import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetMerchantsLocations,
  type GetMerchantsLocationsQuery,
  type MerchantLocation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import merchantLocationSchema from '../../../entities/schemas/merchantLocation.js';
import type { FetchMerchantsLocationsAction } from '../../types/index.js';
import type { StoreState } from '../../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

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
  (query: GetMerchantsLocationsQuery, config?: Config) =>
  async (
    dispatch: ThunkDispatch<StoreState, unknown, FetchMerchantsLocationsAction>,
  ): Promise<MerchantLocation[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
      });

      const result = await getMerchantsLocations(query, config);

      dispatch({
        payload: normalize<
          MerchantLocation,
          {
            merchantsLocations: Record<
              MerchantLocation['id'],
              MerchantLocation
            >;
          },
          MerchantLocation['id'][]
        >(result, [merchantLocationSchema]),
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchMerchantsLocationsFactory;
