import * as actionTypes from '../../actionTypes';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetReturnReferences,
  Query,
} from '@farfetch/blackout-client/returns/types';

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @param getReferences - Get references client.
 *
 * @returns Thunk factory.
 */
export const fetchReturnReferencesFactory =
  (getReturnReferences: GetReturnReferences) =>
  (id: string, name: string, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<string> => {
    dispatch({
      type: actionTypes.FETCH_RETURN_REFERENCES_REQUEST,
    });

    try {
      const result = await getReturnReferences(id, name, query, config);

      dispatch({
        type: actionTypes.FETCH_RETURN_REFERENCES_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_REFERENCES_FAILURE,
      });

      throw error;
    }
  };
