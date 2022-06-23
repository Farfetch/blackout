import * as actionTypes from '../../actionTypes';
import { adaptTimestamp } from '../../../helpers/adapters';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PatchReturn,
  PatchReturnData,
  Query,
  Return,
} from '@farfetch/blackout-client/returns/types';

/**
 * @param id     - Return identifier.
 * @param data   - Details of the return to be updated.
 * @param query  - Query parameters for updating the return.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for updating the pickup schedule of a return.
 *
 * @param patchReturn - Patch return client.
 *
 * @returns Thunk factory.
 */
const updateReturnFactory =
  (patchReturn: PatchReturn) =>
  (
    id: number,
    data: PatchReturnData,
    query?: Query,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<Return> => {
    try {
      dispatch({
        type: actionTypes.UPDATE_RETURN_REQUEST,
      });

      const adaptedData = {
        start: adaptTimestamp(data.start) || '',
        end: adaptTimestamp(data.end) || '',
      };

      const result = await patchReturn(id, adaptedData, query, config);

      dispatch({
        type: actionTypes.UPDATE_RETURN_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default updateReturnFactory;
