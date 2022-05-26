import {
  FETCH_REFERENCES_FAILURE,
  FETCH_REFERENCES_REQUEST,
  FETCH_REFERENCES_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  GetReferences,
  Query,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * @param id     - Return identifier.
 * @param name   - Reference name. Possible values: `ReturnNote`,
 *                 `ReturnCustomerRequestedAWB`,`ReturnLabelAWB`, `DropOffLocationsPage`.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @param getReferences - Get references client.
 *
 * @returns Thunk factory.
 */
const fetchReferencesFactory =
  (getReferences: GetReferences) =>
  (id: string, name: string, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<string> => {
    try {
      dispatch({
        type: FETCH_REFERENCES_REQUEST,
      });

      const result = await getReferences(id, name, query, config);

      dispatch({
        type: FETCH_REFERENCES_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_REFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default fetchReferencesFactory;
