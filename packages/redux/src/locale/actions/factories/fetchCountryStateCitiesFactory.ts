import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCountryStateCities,
  GetCountryStateCitiesResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import state from '../../../entities/schemas/state';
import type { Dispatch } from 'redux';

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryStateCities - Get cities client.
 *
 * @returns Thunk factory.
 */
const fetchCountryStateCitiesFactory =
  (getCountryStateCities: GetCountryStateCities) =>
  (countryCode: string, stateId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCountryStateCitiesResponse> => {
    try {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_REQUEST,
      });

      const result = await getCountryStateCities(countryCode, stateId, config);
      const stateWithCities = {
        id: stateId,
        cities: result,
      };

      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        payload: {
          ...normalize(stateWithCities, state),
        },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_STATE_CITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryStateCitiesFactory;
