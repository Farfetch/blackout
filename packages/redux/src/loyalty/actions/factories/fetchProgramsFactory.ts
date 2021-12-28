import {
  FETCH_PROGRAMS_FAILURE,
  FETCH_PROGRAMS_REQUEST,
  FETCH_PROGRAMS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import programSchema from '../../../entities/schemas/program';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { FetchProgramsAction } from '../../types';
import type {
  GetPrograms,
  Program,
} from '@farfetch/blackout-client/loyalty/types';

/**
 * @callback FetchProgramUsersThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load programs.
 *
 * @function fetchProgramsFactory
 * @memberof module:loyalty/actions/factories
 *
 * @param {Function} getPrograms - Get programs client.
 *
 * @returns {FetchProgramUsersThunkFactory} Thunk factory.
 */

const fetchProgramsFactory =
  (getPrograms: GetPrograms) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchProgramsAction>): Promise<Program[]> => {
    dispatch({
      type: FETCH_PROGRAMS_REQUEST,
    });

    try {
      const result = await getPrograms(config);

      dispatch({
        payload: normalize(result, [programSchema]),
        type: FETCH_PROGRAMS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PROGRAMS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProgramsFactory;
