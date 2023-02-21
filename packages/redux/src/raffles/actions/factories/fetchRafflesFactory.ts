import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetRaffles,
  type Raffles,
  type RafflesQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { buildQueryStringFromObject as generateRafflesHash } from '../../../helpers';
import { normalize } from 'normalizr';
import raffleSchema from '../../../entities/schemas/raffles';
import type { Dispatch } from 'redux';
import type { Nullable } from '../../../types';

/**
 * Method responsible for fetching raffles.
 *
 * @param getRaffles - Get raffles client.
 *
 * @returns Thunk factory.
 */
const fetchRafflesFactory =
  (getRaffles: GetRaffles) =>
  (query?: RafflesQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<Raffles> => {
    let hash: Nullable<string> = null;

    try {
      hash = generateRafflesHash(query || {});

      dispatch({
        meta: { hash },
        type: actionTypes.FETCH_RAFFLES_REQUEST,
      });

      const result = await getRaffles(query, config);
      const normalizedResult = normalize(result, {
        entries: [raffleSchema],
      });

      dispatch({
        meta: { hash },
        payload: normalizedResult,
        type: actionTypes.FETCH_RAFFLES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { hash },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RAFFLES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchRafflesFactory;
