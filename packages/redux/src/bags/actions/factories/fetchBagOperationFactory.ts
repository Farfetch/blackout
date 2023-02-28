import {
  type Bag,
  type BagOperation,
  type Config,
  type GetBagOperation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  FETCH_BAG_OPERATION_FAILURE,
  FETCH_BAG_OPERATION_REQUEST,
  FETCH_BAG_OPERATION_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import bagOperationSchema from '../../../entities/schemas/bagOperation';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to fetch a bag operation with given id.
 *
 * @param  getBagOperation - Get bag operation client.
 *
 * @returns  Thunk factory.
 */
const fetchBagOperationFactory =
  (getBagOperation: GetBagOperation) =>
  (bagId: Bag['id'], bagOperationId: BagOperation['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<BagOperation> => {
    try {
      dispatch({
        type: FETCH_BAG_OPERATION_REQUEST,
        meta: { bagOperationId },
      });

      const result = await getBagOperation(bagId, bagOperationId, config);

      await dispatch({
        payload: { ...normalize(result, bagOperationSchema) },
        meta: { bagOperationId },
        type: FETCH_BAG_OPERATION_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        meta: { bagOperationId },
        type: FETCH_BAG_OPERATION_FAILURE,
      });

      throw error;
    }
  };

export default fetchBagOperationFactory;
