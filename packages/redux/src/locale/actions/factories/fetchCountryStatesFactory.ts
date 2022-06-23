import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';
import type {
  GetCountryStates,
  States,
} from '@farfetch/blackout-client/locale/types';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the states related.
 * @param config      - Custom configurations to send to the client instance.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all states from a specific country.
 *
 * @param getCountryStates - Get states client.
 *
 * @returns Thunk factory.
 */
const fetchCountryStatesFactory =
  (getCountryStates: GetCountryStates) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<States> => {
    try {
      dispatch({
        meta: { countryCode },
        type: actionTypes.FETCH_COUNTRY_STATES_REQUEST,
      });

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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_STATES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryStatesFactory;
