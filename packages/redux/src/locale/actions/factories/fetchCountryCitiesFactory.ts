import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCountryCities,
  GetCountryCitiesResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import state from '../../../entities/schemas/state';
import type { Dispatch } from 'redux';

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryCities - Get cities client.
 *
 * @returns Thunk factory.
 */
const fetchCountryCitiesFactory =
  (getCountryCities: GetCountryCities) =>
  (countryCode: string, stateId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCountryCitiesResponse> => {
    try {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        type: actionTypes.FETCH_COUNTRY_CITIES_REQUEST,
      });

      const result = await getCountryCities(countryCode, stateId, config);
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
        type: actionTypes.FETCH_COUNTRY_CITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: {
          countryCode,
          stateId,
        },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COUNTRY_CITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryCitiesFactory;
