import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type {
  Countries,
  GetCountries,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all countries.
 *
 * @param getCountries - Get countries client.
 *
 * @returns Thunk factory.
 */
const fetchCountriesFactory =
  (getCountries: GetCountries) =>
  (query?: { pageIndex?: number; pageSize?: number }, config?: Config) =>
  async (dispatch: Dispatch): Promise<Countries> => {
    try {
      dispatch({
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      });

      const result = await getCountries(query, config);

      dispatch({
        payload: {
          ...normalize(result, { entries: [country] }),
        },
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountriesFactory;
