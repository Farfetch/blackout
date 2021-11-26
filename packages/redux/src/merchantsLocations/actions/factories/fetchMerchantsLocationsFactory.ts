import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
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
 * @typedef {object} FetchMerchantsLocationsQuery
 *
 * @property {string} [merchantIds] - Pipe separated list of merchant location
 * identifiers to filter for. For example: `3456|9687|12455`.
 * @property {string} [merchantLocationIds] - Pipe separated list of merchant
 * location identifiers to filter for. For example: `9111|9222|9333`.
 * @property {number} [countryId] - Numeric country identifier to filter for.
 */

/**
 * @callback FetchMerchantsLocationsThunkFactory
 *
 * @param {FetchMerchantsLocationsQuery} [query] - Query with parameters to
 * fetch the merchants locations.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch
 * merchants locations for the given merchant, merchantLocation and/or
 * country ids.
 *
 * @memberof module:merchantsLocations/actions/factories
 *
 * @param {Function} getMerchantsLocations - Get merchants locations client.
 *
 * @returns {FetchMerchantsLocationsThunkFactory} Thunk factory.
 */
const fetchMerchantsLocationsFactory =
  (getMerchantsLocations: GetMerchantsLocations) =>
  (query: GetMerchantsLocationsQuery, config?: Record<string, unknown>) =>
  async (
    dispatch: ThunkDispatch<StoreState, any, FetchMerchantsLocationsAction>,
  ): Promise<MerchantLocation[]> => {
    dispatch({
      type: actionTypes.FETCH_MERCHANTS_LOCATIONS_REQUEST,
    });

    try {
      const result = await getMerchantsLocations(query, config);

      dispatch({
        payload: normalize(result, [merchantLocationSchema]),
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchMerchantsLocationsFactory;
