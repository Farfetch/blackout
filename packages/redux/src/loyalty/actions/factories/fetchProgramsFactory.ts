import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetPrograms,
  Program,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import programSchema from '../../../entities/schemas/program';
import type { Dispatch } from 'redux';
import type { FetchProgramsAction } from '../../types';

/**
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Load programs.
 *
 * @param getPrograms - Get programs client.
 *
 * @returns Thunk factory.
 */

const fetchProgramsFactory =
  (getPrograms: GetPrograms) =>
  (config?: Config) =>
  async (dispatch: Dispatch<FetchProgramsAction>): Promise<Program[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROGRAMS_REQUEST,
      });

      const result = await getPrograms(config);

      dispatch({
        payload: normalize(result, [programSchema]),
        type: actionTypes.FETCH_PROGRAMS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PROGRAMS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProgramsFactory;
