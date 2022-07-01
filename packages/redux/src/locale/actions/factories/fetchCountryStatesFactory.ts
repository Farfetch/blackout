import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCountryStates,
  GetCountryStatesResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Dispatch } from 'redux';

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
  async (dispatch: Dispatch): Promise<GetCountryStatesResponse> => {
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
