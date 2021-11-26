import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCountryStates,
  States,
} from '@farfetch/blackout-client/locale/types';

/**
 * @callback FetchCountryStatesThunkFactory
 *
 * @memberof module:locale/actions/factories
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the states related.
 * @param {Object} [config] - Custom configurations to send to the client
 * instance.
 *
 * @returns {FetchCountryStatesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all states from a specific country.
 *
 * @memberof module:locale/actions/factories
 *
 * @param {Function} getCountryStates - Get states client.
 *
 * @returns {FetchCountryStatesThunkFactory} Thunk factory.
 */
const fetchCountryStatesFactory =
  (getCountryStates: GetCountryStates) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<States> => {
    dispatch({
      meta: { countryCode },
      type: actionTypes.FETCH_COUNTRY_STATES_REQUEST,
    });

    try {
      const result = await getCountryStates(countryCode, config);
      const countryWithStates = {
        code: countryCode,
        states: result,
      };

      dispatch({
        meta: { countryCode },
        payload: {
          ...normalize(countryWithStates, country),
        },
        type: actionTypes.FETCH_COUNTRY_STATES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { countryCode },
        payload: { error },
        type: actionTypes.FETCH_COUNTRY_STATES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryStatesFactory;
