import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCountries,
  GetCountriesResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';

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
  async (dispatch: Dispatch): Promise<GetCountriesResponse> => {
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
