import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  Countries,
  GetCountries,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} FetchCountriesQuery
 * @property {number} [pageIndex=1] - The current page.
 * @property {number} [pageSize=15] - Size of each page, as a number.
 */

/**
 * @callback FetchCountriesThunkFactory
 *
 * @memberof module:locale/actions/factories
 *
 * @param {FetchCountriesQuery} [query] - Query parameters to apply to the request.
 * @param {Object} [config] - Custom configurations to send to the client
 * instance.
 *
 * @returns {FetchCountriesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all countries.
 *
 * @memberof module:locale/actions/factories
 *
 * @param {Function} getCountries - Get countries client.
 *
 * @returns {FetchCountriesThunkFactory} Thunk factory.
 */
const fetchCountriesFactory =
  (getCountries: GetCountries) =>
  (query?: { pageIndex?: number; pageSize?: number }, config?: Config) =>
  async (dispatch: Dispatch): Promise<Countries> => {
    dispatch({
      type: actionTypes.FETCH_COUNTRIES_REQUEST,
    });

    try {
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
        payload: { error },
        type: actionTypes.FETCH_COUNTRIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountriesFactory;
