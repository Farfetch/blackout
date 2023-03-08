import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type Country,
  type GetCountries,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country.js';
import type { Dispatch } from 'redux';
import type { FetchCountriesAction } from '../../types/index.js';

/**
 * Fetch all countries.
 *
 * @param getCountries - Get countries client.
 *
 * @returns Thunk factory.
 */
const fetchCountriesFactory =
  (getCountries: GetCountries) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchCountriesAction>): Promise<Country[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_COUNTRIES_REQUEST,
      });

      const result = await getCountries(config);

      dispatch({
        payload: {
          ...normalize(result, [country]),
        },
        type: actionTypes.FETCH_COUNTRIES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_COUNTRIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCountriesFactory;
