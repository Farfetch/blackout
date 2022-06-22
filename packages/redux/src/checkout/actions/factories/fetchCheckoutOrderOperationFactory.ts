import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import checkoutOrderOperation from '@farfetch/blackout-redux/entities/schemas/checkoutOrderOperation';
import type { CheckoutOrderOperation } from '@farfetch/blackout-client/checkout/types/checkoutOrderOperation.types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetOperation,
  GetOperationParams,
} from '@farfetch/blackout-client/checkout/types';

/**
 * Method responsible for obtaining the checkout order operation.
 *
 * @param getOperation - Get checkout operation client.
 *
 * @returns Thunk factory.
 */
const fetchCheckoutOrderOperationFactory =
  (getOperation: GetOperation) =>
  /**
   * @param params - Params to retrieve the checkout operation.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (params: GetOperationParams, config?: Config) =>
  async (dispatch: Dispatch): Promise<CheckoutOrderOperation> => {
    dispatch({
      type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
    });

    try {
      const result = await getOperation(params, config);

      dispatch({
        payload: normalize(result, checkoutOrderOperation),
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
      });

      throw error;
    }
  };

export default fetchCheckoutOrderOperationFactory;
