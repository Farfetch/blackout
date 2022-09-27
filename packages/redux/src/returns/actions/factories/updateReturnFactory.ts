import * as actionTypes from '../../actionTypes';
import { adaptDate, adaptTimestamp } from '../../../helpers/adapters';
import {
  Config,
  PatchReturn,
  PatchReturnData,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for updating the pickup schedule of a return.
 *
 * @param patchReturn - Patch return client.
 *
 * @returns Thunk factory.
 */
const updateReturnFactory =
  (patchReturn: PatchReturn) =>
  (returnId: Return['id'], data: PatchReturnData, config?: Config) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({
        meta: { returnId },
        type: actionTypes.UPDATE_RETURN_REQUEST,
      });

      const adaptedData = {
        start: adaptTimestamp(data.start) || '',
        end: adaptTimestamp(data.end) || '',
      };

      await patchReturn(returnId, adaptedData, config);

      dispatch({
        meta: { returnId },
        payload: {
          pickupSchedule: {
            start: adaptedData.start && adaptDate(adaptedData.start),
            end: adaptedData.end && adaptDate(adaptedData.end),
          },
        },
        type: actionTypes.UPDATE_RETURN_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { returnId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.UPDATE_RETURN_FAILURE,
      });

      throw error;
    }
  };

export default updateReturnFactory;
