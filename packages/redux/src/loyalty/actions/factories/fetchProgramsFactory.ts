import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetPrograms,
  type Program,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import programSchema from '../../../entities/schemas/program.js';
import type { Dispatch } from 'redux';
import type { FetchProgramsAction } from '../../types/index.js';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PROGRAMS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProgramsFactory;
